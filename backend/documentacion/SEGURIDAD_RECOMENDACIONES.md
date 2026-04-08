# Recomendaciones de seguridad — Backend (Psicoeducándonos)

Documento consolidado a partir de la revisión del API NestJS (autenticación JWT, guards, citas, usuarios, bootstrap). Sirve como checklist de endurecimiento antes de producción.

**Ámbito:** `backend/src` (NestJS 11, TypeORM, Passport JWT).

---

## Resumen ejecutivo

| Prioridad | Cantidad de ítems |
|-----------|-------------------|
| Crítico   | 1 |
| Alto      | 4 |
| Medio     | 4 |
| Bajo      | 2 |

**Orden sugerido de implementación:** secret JWT obligatorio → rate limiting (auth) → CORS/Helmet en prod → allowlist de URLs (`http`/`https`) → política de contraseñas → revalidación de sesión / `isActive`.

---

## Crítico

### 1. `JWT_SECRET` con valor por defecto

**Situación:** En `jwt.strategy.ts`, si falta la variable de entorno `JWT_SECRET`, se usa el literal `'defaultSecret'`. Quien conozca el repositorio puede forjar tokens válidos.

**Recomendación:**

- En el arranque de la aplicación, si `JWT_SECRET` no está definido o es un valor de la lista de denegados (p. ej. `defaultSecret`), **terminar el proceso** con error claro.
- En producción, exigir un secreto largo y aleatorio (p. ej. ≥ 32 bytes en base64 o hex) gestionado solo por variables de entorno o secret manager.
- Rotar el secreto ante posible filtración e invalidar sesiones antiguas (o aceptar ventana de convivencia con dos claves si se implementa).

---

## Alto

### 2. CORS demasiado permisivo

**Situación:** `main.ts` usa `app.enableCors()` sin restricción de `origin`.

**Riesgo:** En producción, sitios de terceros pueden disparar peticiones desde el navegador del usuario; combinado con una mala gestión del token en el front, aumenta la superficie de abuso.

**Recomendación:**

- Configurar orígenes explícitos: `origin: process.env.FRONTEND_ORIGIN` (o lista permitida).
- Si se usan cookies con credenciales, definir `credentials: true` y CORS acotado (nunca `*` con credenciales).

### 3. Ausencia de rate limiting en autenticación

**Situación:** No hay límite de intentos en `POST /auth/staff/login`, `POST /auth/patient/login` ni `POST /auth/patient/register`.

**Riesgo:** Ataques de fuerza bruta a contraseñas y abuso del registro (spam, enumeración masiva).

**Recomendación:**

- Añadir `@nestjs/throttler` (o equivalente en API gateway / reverse proxy) con límites por IP y, si aplica, por email.
- Considerar backoff o bloqueo temporal tras N fallos en login.
- Opcional: CAPTCHA en registro si hay abuso.

### 4. Confianza total en el JWT hasta su expiración

**Situación:** El payload del JWT se valida criptográficamente, pero no se revalida en base de datos si el usuario o paciente sigue activo o si la cuenta fue deshabilitada. `expiresIn` configurado en días (p. ej. 7d).

**Riesgo:** Tokens válidos tras revocación lógica de cuenta o cambio de rol hasta que expiren.

**Recomendación:**

- En rutas sensibles, comprobar `isActive` (y rol actual) frente a la BD, o introducir `tokenVersion` / `jti` revocable.
- Valorar sesiones más cortas + refresh token con rotación y almacenamiento controlado.

### 5. Validación de `meetingLink` y `paymentReceiptUrl`

**Situación:** DTOs usan `@IsUrl({ require_tld: false })`, que no equivale a “solo HTTP/HTTPS seguros para la aplicación”.

**Riesgo:** Esquemas o URLs inesperados podrían usarse en clientes o redirecciones si el front confía en el valor.

**Recomendación:**

- Allowlist explícita de protocolos: solo `http:` y `https:` (idealmente solo `https:` en producción para enlaces externos).
- Implementar validación custom (`new URL()`, comprobar `protocol`) o decorador dedicado.
- Rechazar `javascript:`, `data:`, etc.

---

## Medio

### 6. Política débil de contraseñas en registro de paciente

**Situación:** `RegisterPatientDto` usa `@MinLength(6)` para la contraseña.

**Recomendación:**

- Subir el mínimo (p. ej. 8–12 caracteres) y añadir requisitos razonables (mayúsculas/números) según política del producto.
- Opcional: integrar comprobador de contraseñas filtradas (Have I Been Pwned API u offline).

### 7. Cabeceras HTTP de seguridad (Helmet)

**Situación:** No se aplica `helmet` ni equivalente en `main.ts`.

**Recomendación:**

- Añadir `helmet` en producción y ajustar `Content-Security-Policy` de forma compatible con Angular (sin romper assets y APIs).
- Revisar `X-Content-Type-Options`, `Referrer-Policy`, etc.

### 8. Exposición de datos personales en respuestas de citas

**Situación:** Las respuestas incluyen email y nombres entre terapeuta y paciente (coherente con agendar, pero sensible).

**Recomendación:**

- Documentar el tratamiento de datos (RGPD / normativa local de salud si aplica).
- Valorar minimización en listados (p. ej. solo iniciales o ID interno) y detalle completo solo donde sea estrictamente necesario.

### 9. Endpoint raíz público

**Situación:** `AppController` expone `GET /` con un saludo.

**Recomendación:**

- En producción, sustituir por health check sin información útil al atacante o proteger tras autenticación según política de despliegue.

---

## Bajo / higiene

### 10. Duplicidad de dependencias bcrypt

**Situación:** El proyecto puede declarar `bcrypt` y `bcryptjs` a la vez.

**Recomendación:** Unificar en una sola librería para reducir superficie de dependencias y auditorías.

### 11. Rol ADMIN y citas

**Situación:** Solo el usuario que actúa como `therapist` de la cita puede confirmar/rechazar; un ADMIN no gestiona citas ajenas por defecto.

**Recomendación:** Si el negocio requiere “superadmin”, modelar endpoints y auditoría explícitos (logs, quién modificó qué).

---

## Aspectos positivos ya presentes

- **Autorización e IDOR en citas:** comprobación de pertenencia del recurso al paciente o al terapeuta según el caso (`findByIdForActor`, listados por `user.id`).
- **Guards:** JWT + tipo de usuario (`STAFF` / `PATIENT`) + roles de staff donde aplica (p. ej. listado de usuarios solo ADMIN).
- **Validación de entrada global:** `ValidationPipe` con `whitelist` y `forbidNonWhitelisted`; DTOs en auth y citas.
- **Login:** mensaje genérico ante fallo (no distinguir “usuario no existe” vs “contraseña incorrecta” de forma explícita).
- **Contraseñas en reposo:** uso de bcrypt; entidades con `passwordHash` con `select: false` donde corresponde; respuestas de usuario sin hash.
- **`.env.example`:** referencia de variables sin secretos reales (recordatorio: no commitear `.env` con valores productivos).

---

## Referencias internas

- Checklist general del proyecto: `PROJECT_CHECKLIST.md` (sección C — seguridad y calidad).
- Skill de proyecto: `.cursor/skills/application-security/SKILL.md`.

---

## Historial

| Fecha | Nota |
|-------|------|
| *(rellenar)* | Creación del documento a partir de revisión de código backend. |
| *(rellenar)* | Implementación parcial en código: `validate-env`, Helmet, CORS con `FRONTEND_ORIGIN`, throttler en `/auth`, `JwtStrategy` con revalidación BD, `IsHttpUrl`, contraseña registro reforzada, health mínimo, eliminación de `bcryptjs`. Detalle de pendientes por front/producto en `PROJECT_CHECKLIST.md` sección C. |
