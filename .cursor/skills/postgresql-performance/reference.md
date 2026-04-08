# PostgreSQL performance reference

## Useful catalog queries

- **Missing index hints (heuristic):** inspect `pg_stat_user_tables` (seq scans vs idx scans), `pg_stat_user_indexes` (idx_scan low on large tables).
- **Bloat and vacuum:** `pg_stat_all_tables` (`n_dead_tup`, `last_autovacuum`); tune autovacuum for write-heavy tables.
- **Locks:** `pg_locks` joined to `pg_stat_activity` when diagnosing contention.

## Maintenance

- **`VACUUM (ANALYZE)`** after large deletes or DDL in dev; production usually relies on autovacuum with tuned thresholds for big tables.
- **REINDEX** rarely; use when corruption or demonstrable index bloat after measurement.

## Statement timeout example

Set per-session or per-role in migration or role defaults so ORM cannot hang the pool indefinitely.

## Read replicas

Route **read-only** reporting queries to replicas; keep **strong consistency** paths on primary. Watch replication lag when showing “just written” data.
