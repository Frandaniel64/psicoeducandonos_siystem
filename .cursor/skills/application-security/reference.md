# Referencia rápida OWASP / ASVS (resumen)

Usar como lista de verificación; no sustituye un pentest profesional.

## Autenticación (V2)

- Política de contraseñas razonable; bloqueo o backoff ante fuerza bruta.
- MFA donde el riesgo lo exija (cuentas staff/admin).
- Sesiones/JWT con expiración y revocación acordes al modelo de negocio.

## Acceso (V4)

- Cada operación verifica autorización en servidor.
- Listados paginados; sin “listar todo” sin filtro de dueño/rol.

## Validación (V5)

- Tipos, rangos y formatos en DTOs; listas blancas para enums.
- Normalización de strings (email, espacios) antes de reglas de negocio.

## Criptografía (V7)

- TLS en tránsito en producción.
- Datos en reposo sensibles cifrados según normativa aplicable (salud, etc.).

## Errores y logging (V7/V8)

- Sin stack traces al cliente en producción.
- Logs sin PAN, contraseñas, tokens completos; enmascarar identificadores cuando sea posible.

## Integración y SSRF (V10/V12)

- URLs y webhooks: validar destinos; no seguir redirects ciegos hacia red interna.

## Archivos (V12)

- Límites de tamaño; antivirus o análisis según política; MIME real vs declarado.
