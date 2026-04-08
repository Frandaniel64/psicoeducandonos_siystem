---
fecha: YYYY-MM-DD
tema: <breve descripción>
docker: ok | parcial | no-aplica
urls_base:
  frontend: http://localhost:4200
  backend: http://localhost:3000
---

# E2E — <título legible>

## Resumen ejecutivo

<!-- 1–3 frases: ¿pasó la corrida? ¿bloqueos? -->

## Cómo se probó

### Entorno (Docker / .env)

<!-- Comandos ejecutados, ej.: docker compose up -d --build; notas sobre backend/.env (DB_HOST=db en contenedor). -->

### Tests automatizados

<!-- Comandos (npm test, npm run test:e2e, etc.), exit code, archivos de test relevantes. Si se omitió, indicar por qué. -->

### Navegador (MCP cursor-ide-browser)

<!-- Rutas visitadas, interacciones (clics por ref o descripción), herramientas usadas (snapshot, console, network). -->

## Resultados OK

Marcar `[x]` cuando verificado en esta u otra sesión documentada.

- [ ] <!-- ej.: CTA hero "Reserva tu 1° Sesión" navega a /nosotros -->

## Hallazgos / errores (pendiente → corregido)

Formato: una viñeta por hallazgo; pasar a `[x]` al estar corregido y re-probado.

- [ ] **H-001** — <!-- descripción corta -->
  - **Severidad:** alta | media | baja
  - **Reproducir:** <!-- pasos -->
  - **Archivos / área:** <!-- rutas o módulos -->
  - **Evidencia:** <!-- URL, mensaje de error, ref del snapshot, etc. -->

## Registro de re-ejecuciones

| Fecha | Nota | Hallazgos cerrados |
|-------|------|---------------------|
| | | |
