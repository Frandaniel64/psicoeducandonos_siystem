---
fecha: 2026-04-07
tema: Home — CTAs, navbar, footer, FAQ, newsletter, FAB vs portal
docker: ok (tras instalar quill en contenedor frontend y reiniciar)
urls_base:
  frontend: http://localhost:4200
  backend: http://localhost:3000
---

# E2E — Home: botones, enlaces y acciones

## Resumen ejecutivo

Stack Docker levantado; Angular sirvió en `:4200` tras resolver dependencia `quill` en el contenedor. Se probaron interacciones principales del home y pie vía MCP navegador. Varios controles no tienen comportamiento implementado o enlaces placeholder; el FAB fijo puede tapar el enlace "Portal de Terapeutas" al hacer scroll al footer.

## Cómo se probó

### Entorno (Docker / .env)

- `docker compose up -d --build` desde la raíz del repo.
- Creado/usado `backend/.env` con `DB_HOST=db` para el servicio backend en Compose.
- Frontend: error inicial TS/`quill` en imagen + volumen `node_modules`; remedio: `docker exec psicoeducandonos_frontend npm install quill` + `docker restart psicoeducandonos_frontend`.

### Tests automatizados

- No ejecutados en esta sesión (foco navegador home).

### Navegador (MCP cursor-ide-browser)

- `browser_navigate` → `http://localhost:4200/`
- Clics en enlaces y botones según snapshot (refs); comprobación de URL tras navegación.
- Navegación directa a `http://localhost:4200/auth/staff/login` para validar ruta staff.

## Resultados OK

- [x] **Reserva tu 1° Sesión** (hero) → `/nosotros`
- [x] **Explorar Talleres** → `/servicios`
- [x] **Ver todo el Blog** → `/blog`
- [x] **Hablar con un especialista** (FAB) → `/nosotros`
- [x] **Iniciar Sesión** (navbar) → `/auth/login`
- [x] **Registro** (navbar) → `/auth/registro`
- [x] **Inicio** (navbar desde otra ruta) → `/`
- [x] Ruta **Portal terapeuta** existe: `/auth/staff/login` carga formulario

## Hallazgos / errores (pendiente → corregido)

- [ ] **H-001** — Botones **Ver más detalles** y **Ver próximos inicios** (bloque servicios en home) no navegan ni disparan acción (solo foco).
  - **Severidad:** media
  - **Reproducir:** En `/`, scroll a "Nuestros Espacios de Sanación", clic en cada botón; URL permanece `/`.
  - **Archivos / área:** `frontend/src/app/pages/home/home.html`
  - **Evidencia:** Botones sin `routerLink` ni `(click)`.

- [ ] **H-002** — Acordeón **FAQ** (cuatro preguntas): clic no expande contenido.
  - **Severidad:** media
  - **Reproducir:** Clic en cada fila FAQ en `/`.
  - **Archivos / área:** `frontend/src/app/pages/home/home.html`, `home.ts` sin estado
  - **Evidencia:** Sin panel de respuesta en DOM tras clic.

- [ ] **H-003** — Tarjetas de artículos en home (preview blog): aspecto clicable (`cursor-pointer`) pero **sin** `routerLink` a `/blog/:id`.
  - **Severidad:** media
  - **Reproducir:** Clic en título/tarjeta; no hay navegación.
  - **Archivos / área:** `frontend/src/app/pages/home/home.html`

- [ ] **H-004** — Footer: **Privacidad**, **Términos**, **Contacto**, **Instagram**, **LinkedIn**, **Facebook** usan `href="#"` (placeholder).
  - **Severidad:** baja (contenido legal / enlaces reales pendientes)
  - **Reproducir:** Clic en Privacidad → URL `/#`.
  - **Archivos / área:** `frontend/src/app/layout/footer/footer.html`

- [ ] **H-005** — Newsletter (campo **Tu correo** + botón **send**): sin feedback ni integración visible tras enviar.
  - **Severidad:** baja
  - **Reproducir:** Rellenar email, clic send; sin toast ni request documentada en esta sesión.
  - **Archivos / área:** `frontend/src/app/layout/footer/footer.html`

- [ ] **H-006** — **Portal de Terapeutas** (footer): con scroll al pie, el clic puede ser **interceptado** por el FAB **Hablar con un especialista** (`fixed`, `z-50`).
  - **Severidad:** media (UX / bloqueo de acción)
  - **Reproducir:** Scroll hasta footer en `/`, intentar clic en "Portal de Terapeutas".
  - **Archivos / área:** `home.html` (FAB), `footer.html` (portal), revisar `z-index` y márgenes/padding del footer o ocultar FAB cerca del footer.

- [ ] **H-007** — Imagen Docker frontend: `node_modules` en volumen anónimo puede quedar desincronizado con `package.json` (ej. falta `quill` en runtime).
  - **Severidad:** media (DX / CI local)
  - **Reproducir:** `docker compose up` tras añadir dependencia en `package.json` sin recrear volumen.
  - **Archivos / área:** `docker-compose.yml`, `frontend/Dockerfile.dev`
  - **Evidencia:** Build Angular TS2307 / CSS import quill hasta `npm install` dentro del contenedor.

## Registro de re-ejecuciones

| Fecha | Nota | Hallazgos cerrados |
|-------|------|---------------------|
| 2026-04-07 | Primera corrida documentada | — |

## Asignación backend (implementación)

- [x] **BE-H005 [P1][M]** Newsletter endpoint con validación, deduplicación y respuestas claras (`POST /api/v1/public/newsletter/subscribe`).
- [x] **BE-H007 [P1][S]** Arranque docker reproducible endurecido en backend (`docker-compose.yml`: `npm ci` antes de `start:dev`; sin instalación manual dentro del contenedor).
- [x] **BE-H003 [P2][S]** Payload de blog para navegación FE incluye `id` y `slug` (`GET /api/v1/public/blog/featured`).
- [x] **BE-H004 [P2][S]** Definición aplicada: enlaces legal/contacto servidos por API pública (preparado para futura migración a CMS) (`GET /api/v1/public/footer-links`).
