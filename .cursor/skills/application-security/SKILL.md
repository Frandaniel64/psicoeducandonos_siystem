---
name: application-security
description: Hardens web applications (NestJS APIs, Angular SPAs, PostgreSQL) against common threats: authn/z, input validation, secrets, headers, CORS, logging, and supply chain. Use when the user asks for security, OWASP, threat modeling, pentest prep, hardening, JWT, XSS, CSRF, injection, IDOR, or attack surface review.
---

# Seguridad de aplicaciones (web)

## Objetivo

Reducir riesgo con **defensa en profundidad**: asumir que la red y el cliente no son confiables; el backend valida todo; los secretos nunca van al repositorio.

## Backend (API NestJS)

- **Autenticación:** contraseñas con algoritmo fuerte y coste adecuado (p. ej. bcrypt); nunca devolver hashes ni tokens en logs.
- **Autorización:** comprobar **identidad y rol** en cada ruta sensible (`Guards`); no confiar solo en “ocultar” el botón en el front.
- **IDOR:** usar ids del recurso **y** comprobar que el `sub` del JWT (o sesión) tiene derecho a ese recurso (paciente solo su historial, terapeuta solo sus ámbitos, etc.).
- **Validación:** DTOs + `ValidationPipe` (`whitelist`, `forbidNonWhitelisted`); rechazar campos extra que intenten escalada.
- **Inyección:** TypeORM con parámetros enlazados; evitar SQL crudo concatenado; sanitizar si se construye SQL dinámico.
- **Errores:** respuestas genéricas al cliente; detalle técnico solo en logs del servidor (sin datos personales innecesarios).
- **CORS:** en producción, **origen explícito** (no `*` con credenciales); revisar `enableCors` frente a despliegue real.
- **Cabeceras HTTP:** en producción, valorar **Helmet** (o equivalente) para `Content-Security-Policy` acotada, `X-Content-Type-Options`, `Referrer-Policy`, etc., sin romper el front.
- **Límites:** rate limiting en login y endpoints abusables; tamaño máximo de body y de subida de archivos.
- **Archivos:** validar tipo y tamaño; nombres seguros; almacenamiento fuera de webroot público; URLs firmadas o control de acceso.

## Frontend (Angular)

- **XSS:** confiar en el sanitizer de plantillas; evitar `bypassSecurityTrust*` salvo necesidad auditada; no inyectar HTML crudo de usuarios sin pipeline seguro.
- **Tokens:** si se usa JWT en el navegador, conocer el trade-off **localStorage vs memoria vs cookies HttpOnly**; nunca loguear el token.
- **Datos sensibles:** no meter secretos de API en el bundle; usar variables de entorno de build solo para lo que sea público por naturaleza.
- **Enlaces externos:** `rel="noopener noreferrer"` en `target="_blank"` cuando corresponda.

## Base de datos y configuración

- Credenciales y claves JWT solo en **variables de entorno** o secret manager; rotación si hay filtración.
- **Principio de mínimo privilegio** en usuario de BD (no usar `superuser` en la app).
- `synchronize: true` solo en desarrollo; en producción **migraciones** revisadas (evita sorpresas y fugas de esquema).

## Secretos y repositorio

- Rechazar commits con `.env`, claves API, PEM, o tokens; usar `.env.example` sin valores reales.
- Revisar dependencias (`npm audit`, actualizaciones de parches) en cambios que toquen `package.json`.

## Flujo breve ante una petición de “revisar seguridad”

1. Delimitar **superficie**: rutas públicas, auth, subida de archivos, admin.
2. Comprobar **authz** en servidor en cada mutación y lectura sensible.
3. Revisar **validación** y **filtrado** de entradas y query params.
4. Revisar **CORS**, **cookies**, **cabeceras** y **exposición de errores**.
5. Listar **hallazgos** por severidad (crítico / alto / medio / bajo) con remedio concreto en archivo o línea cuando sea posible.

## Material ampliado

Checklist alineada a categorías OWASP ASVS (resumida) en [reference.md](reference.md).
