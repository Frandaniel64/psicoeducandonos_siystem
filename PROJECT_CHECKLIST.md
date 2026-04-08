# Checklist maestra — Psicoeducándonos

Lista única para **seguir el avance hasta culminar el proyecto**. Los agentes deben **marcar ítems como hechos** (`[ ]` → `[x]`) solo cuando el cambio esté **implementado y verificable** (build, prueba manual o test). Si un ítem queda a medias, **no marcarlo** y anotar brevemente el faltante en la misma línea entre paréntesis.

**Documentos relacionados:** `BACKEND_TASKS.md`, `FRONTEND_TASKS.md`, `sistema.md`, `ARCHITECTURE.md`.

---

## Leyenda

| Símbolo | Significado |
|--------|-------------|
| `[x]` | Completado |
| `[ ]` | Pendiente |

---

## A. Infraestructura y entorno

- [x] Monorepo: `frontend/` (Angular) + `backend/` (NestJS) + PostgreSQL
- [x] `docker-compose.yml` con servicios db, backend y frontend (dev)
- [x] `Dockerfile.dev` backend y frontend
- [x] Variables de entorno documentadas (`.env.example` en backend sin secretos reales)
- [ ] Despliegue staging/producción definido (hosting, SSL, variables)
- [ ] Migraciones TypeORM en lugar de confiar solo en `synchronize: true` en prod

---

## B. Backend — núcleo y datos

- [x] Conexión PostgreSQL + TypeORM (`DatabaseModule`)
- [x] `ValidationPipe` global (`whitelist`, `forbidNonWhitelisted`, `transform`)
- [x] Prefijo API `/api` y versionado URI `v1`
- [x] CORS con orígenes configurables (`FRONTEND_ORIGIN` obligatorio en `NODE_ENV=production`; en dev por defecto `localhost:4200`)
- [x] Entidad `User` (staff: ADMIN, TERAPEUTA)
- [x] Entidad `Patient` (separada de staff)
- [x] Entidad `Appointment` (fechas, estados, tipo, enlace reunión, comprobante)
- [x] **Guards JWT** aplicados a rutas privadas (`JwtAuthGuard` + `UserTypesGuard` / `StaffRolesGuard`)
- [x] Endpoints **perfil staff** (`GET/PATCH /users/me`) y **listado** `GET /users` (solo ADMIN); alta/baja de cuentas staff vía API pendiente
- [x] Endpoints HTTP del módulo **citas** (`POST .../request`, listados `me/patient` y `me/therapist`, confirmar/rechazar, comprobante paciente)
- [x] Regla de **no solapamiento** de slots para estados que bloquean agenda (`PENDING_REVIEW`, `PAYMENT_DELAYED`, `CONFIRMED`; sesión 50 min)
- [ ] Entidad **historia clínica** (`ClinicalRecord` o equivalente) 1:1 con paciente
- [ ] Endpoints notas de evolución / cuestionarios (según `BACKEND_TASKS` Fase 3)
- [ ] Entidades **CMS**: `Article`, `Category`
- [ ] Endpoints públicos blog (GET + paginación) y privados (POST/PUT/DELETE) por rol
- [ ] MVP **pagos P2P**: perfil de cobro terapeuta, guardrail “sin método de pago no hay agenda”, aprobación de pago / estados
- [ ] **Storage**: Multer (o similar), comprobantes y assets blog con control de acceso
- [ ] **Notificaciones**: SMTP/mailer + plantillas (bienvenida, pago en revisión, link de sesión)

---

## C. Backend — seguridad y calidad

**Implementado en backend (ver `backend/documentacion/SEGURIDAD_RECOMENDACIONES.md`):**

- [x] Validación de `JWT_SECRET` al arranque (sin placeholders; mín. 16 chars dev / 32 prod)
- [x] Rate limiting en rutas **`/auth`** (`@nestjs/throttler`, 20 req / 60s por IP por defecto)
- [x] **Helmet** en API (CSP desactivada en JSON API; `crossOriginResourcePolicy: cross-origin`)
- [x] **CORS** restrictivo en producción vía `FRONTEND_ORIGIN` (coma-separado)
- [x] **Revalidación JWT** contra BD: usuario/paciente activo y rol actual en `JwtStrategy`
- [x] URLs solo **http/https** para `meetingLink` y `paymentReceiptUrl`
- [x] Contraseña registro paciente: mín. 8 caracteres + al menos una letra y un número
- [x] `GET /api/v1/` responde health mínimo `{ status: 'ok' }`
- [x] Dependencia **bcryptjs** eliminada (solo `bcrypt`)

**Pendiente — requiere front, producto o despliegue (no cerrable solo en Nest):**

- [ ] **(Front + despliegue)** Confirmar y documentar **`FRONTEND_ORIGIN`** final (prod/staging/preview) cuando el front tenga dominio definitivo; probar CORS end-to-end desde el navegador
- [ ] **(Front)** **CSP / cabeceras** si en el futuro el mismo host sirve el bundle de Angular desde Nest (hoy el front es app aparte)
- [ ] **(Front + UX/legal)** Minimización de **PII** en pantallas de citas (qué datos muestra listado/calendario vs detalle)
- [ ] **(Front)** Modelo de sesión **refresh token** o cookies **HttpOnly** si se deja de usar solo Bearer en memoria
- [ ] **(Producto)** Endpoints **ADMIN** sobre citas ajenas + **auditoría**, si el negocio lo exige
- [ ] **(Opcional / API externa)** Comprobación de contraseñas filtradas (p. ej. Have I Been Pwned) — privacidad y límites de uso

**Pendiente — calidad / mantenimiento (no bloqueado por front):**

- [ ] Tests mínimos e2e o unitarios en flujos críticos (auth, citas)
- [ ] `npm audit` / dependencias sin vulnerabilidades críticas conocidas

---

## D. Frontend — base técnica

- [x] Tailwind instalado y configurado (`tailwind.config.js`)
- [x] Rutas principales en `app.routes.ts` (home, blog, servicios, nosotros, login, registro, staff/login, agendar)
- [x] **Design tokens** (paleta, tipografía, sombras) acordes a UX en Tailwind/theme
- [x] Rutas anidadas bajo prefijos claros (`/paciente/...`, `/terapeuta/...`, `/auth/...` si aplica)
- [x] `provideHttpClient` + **interceptor JWT** hacia `/api/v1`
- [x] Servicios API (auth, citas, blog) centralizados
- [ ] Manejo de errores HTTP y estados de carga consistentes

---

## E. Frontend — área pública

- [x] Landing **contenido y diseño** alineados a conversión (no solo placeholder)
- [ ] Blog: **listado** desde API (cuando exista CMS)
- [x] Blog: **detalle de artículo** con HTML/Markdown seguro
- [ ] SEO básico (títulos, meta, rutas) donde corresponda

---

## F. Frontend — autenticación

- [x] Login paciente **conectado** a API
- [x] Registro paciente **conectado** a API
- [x] Login staff **conectado** a API
- [x] Persistencia de sesión (token) y cierre de sesión
- [x] **AuthGuard** (y guards por rol) para rutas privadas

---

## G. Frontend — portal paciente

- [x] Layout paciente (navegación dedicada)
- [x] Panel de citas (próximas, enlace videollamada si aplica)
- [ ] Flujo **agendar** completo (calendario/disponibilidad + integración API)
- [ ] Biblioteca de recursos (cuando exista backend)

---

## H. Frontend — portal terapeuta / admin

- [x] Layout terapeuta
- [ ] Calendario / vista de citas del terapeuta
- [ ] Panel de pacientes + acceso a historia clínica (cuando exista API)
- [x] Editor CMS (TipTap/Quill u otro) + flujo publicar borrador

---

## I. Integración visual (Stitch + UX)

- [x] Pantallas nuevas o rediseños relevantes pasan por **Google Stitch** (MCP `user-stitch`) antes de pulir templates
- [ ] Coherencia con `REQUERIMIENTOS_UX_*.md` (pacientes, prestadores, página pública)

---

## J. Cierre de MVP producto

- [ ] **Flujo feliz completo:** registro/login paciente → solicitar cita → terapeuta confirma (y pago P2P si está en alcance MVP) → paciente ve cita y link
- [ ] Datos de prueba o seed para demo
- [ ] README o doc corto: cómo levantar el sistema y credenciales de prueba

---

## Notas de estado (opcional)

_Aquí puede el equipo escribir fecha o comentario corto al cerrar hitos mayores._

- Última revisión de checklist: *(rellenar)*
- Última revisión de checklist: 2026-04-08 (backend home: newsletter público + payload blog con `id/slug` + fuente API para enlaces footer; CMS completo y endpoints privados de blog siguen pendientes)
