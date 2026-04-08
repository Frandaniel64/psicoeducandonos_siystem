---
name: postgresql-performance
description: Optimizes PostgreSQL query plans, indexes, connection usage, and TypeORM patterns for low latency and stable throughput. Use when diagnosing slow APIs or SQL, designing migrations, reviewing entities and relations, or when the user mentions performance, EXPLAIN, indexes, N+1, vacuum, pooling, or database bottlenecks.
---

# PostgreSQL and ORM performance

## Principles

1. **Measure first** — confirm latency and load with `EXPLAIN (ANALYZE, BUFFERS)` (or logs) before large refactors.
2. **Return less** — fewer rows, narrower columns, fewer round-trips beat micro-optimizations in app code.
3. **Indexes serve specific predicates** — an index that does not match `WHERE` / `JOIN` / `ORDER BY` is dead weight on writes.

## PostgreSQL: find the real cost

- Run **`EXPLAIN (ANALYZE, BUFFERS)`** on representative parameters (not only “happy path” literals that skew plans).
- Red flags:
  - **Seq Scan** on large tables with selective filters.
  - **Nested Loop** with huge inner rows.
  - **Sort** / **HashAggregate** on wide intermediate sets when an index could provide order.
  - High **`Buffers: shared read`** on hot queries → working set larger than RAM or missing cache warmth (still often fixable with better indexes or less data touched).
- Use **`pg_stat_statements`** (if enabled) to rank by total time or mean time, not only count.

## Indexing checklist

- **Equality first, then range** in composite indexes (left-to-right prefix rule).
- **Partial indexes** when the predicate is stable and selective (e.g. `WHERE deleted_at IS NULL AND status = 'ACTIVE'`).
- **Covering indexes** (`INCLUDE` columns) to avoid heap fetches when the query only needs a few extra columns.
- Avoid redundant indexes that are prefixes of stronger ones unless proven needed for different sort orders.
- After bulk loads or large DDL, consider **`ANALYZE`** (or rely on autovacuum) so the planner has fresh stats.

## TypeORM (NestJS) specifics

- **N+1:** prefer `relations` + careful `find` options, **`QueryBuilder`** with explicit `leftJoinAndSelect`, or batched loaders for graphs; never loop `findOne` per id without batching.
- **Select only needed columns** — use `.select([...])` / partial entities where hot paths are read-heavy; avoid `select: false` fields unless required, then load explicitly when needed.
- **Pagination:** use `skip`/`take` (offset) only for small offsets; for deep pages prefer **keyset** (`WHERE id > :cursor ORDER BY id LIMIT n`).
- **Transactions:** keep them short; avoid long-held transactions during external HTTP calls.
- **Production:** disable **`synchronize: true`**; ship **migrations** so indexes and constraints are explicit and reviewable.

## Connections and pool

- Size pool to **`connections ≪ max_connections`** on the server; oversubscribing pools across many app instances causes queueing and errors.
- Use a **PgBouncer** (or managed pooler) in transaction mode when many short-lived app workers connect.
- Set sensible **timeouts** (`statement_timeout`, `idle_in_transaction_session_timeout`) to contain runaway queries.

## Schema and types

- Prefer **narrow types** and **UUID / bigint** keys consistently; avoid oversized `text` where `varchar(n)` or enums match reality.
- **Foreign keys** with matching types and indexes on the referencing column(s) speed joins and cascades.
- **JSONB** is fine for flexible attributes; index with **GIN** only when you query inside JSON with proven selectivity.

## Anti-patterns

- Indexes “just in case” without `EXPLAIN` evidence.
- **`LIKE '%foo'`** leading wildcards — cannot use normal B-tree index; consider `pg_trgm` or full-text search if required.
- **Functions on indexed columns** in `WHERE` (`WHERE lower(email) = ...`) — prevents index use unless expression index.
- **Polling** the database in tight loops from the app; use notifications, queues, or caching.

## Workflow when the user reports slowness

1. Identify the **exact query or endpoint** and parameters.
2. Capture **`EXPLAIN (ANALYZE, BUFFERS)`** in a staging DB with similar data volume.
3. Propose the **smallest change**: index, query rewrite, or ORM shape (one of these, not all at once if avoidable).
4. Re-run `EXPLAIN` and compare **actual time** and **buffers**.
5. If CPU and plans are healthy but latency remains, look **outside** DB: network, pool wait, serialization in Node, missing caching for read-mostly data.

## Optional deep dive

For PostgreSQL internals and maintenance commands in long form, see [reference.md](reference.md).
