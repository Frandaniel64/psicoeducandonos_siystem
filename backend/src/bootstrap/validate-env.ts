const JWT_SECRET_DENYLIST = new Set([
  '',
  'defaultsecret',
  'changeme',
  'secret',
  'jwt_secret',
  'your-secret',
  'cambiar-por-secreto-largo-y-aleatorio',
]);

/**
 * Falla rápido si faltan variables críticas o son placeholders inseguros.
 * Llamar antes de NestFactory.create.
 */
export function validateBootstrapEnv(): void {
  const secret = process.env.JWT_SECRET?.trim();
  if (!secret || JWT_SECRET_DENYLIST.has(secret.toLowerCase())) {
    throw new Error(
      'JWT_SECRET debe definirse con un valor aleatorio fuerte (no uses el placeholder del ejemplo). Ver backend/.env.example',
    );
  }
  if (secret.length < 16) {
    throw new Error('JWT_SECRET debe tener al menos 16 caracteres');
  }

  if (process.env.NODE_ENV === 'production') {
    if (secret.length < 32) {
      throw new Error('JWT_SECRET debe tener al menos 32 caracteres en producción');
    }
    const origins = process.env.FRONTEND_ORIGIN?.trim();
    if (!origins) {
      throw new Error(
        'FRONTEND_ORIGIN es obligatorio en producción (orígenes permitidos CORS, separados por coma). Coordinar con la URL del front desplegado.',
      );
    }
  }
}

export function getCorsOriginConfig():
  | boolean
  | string
  | string[]
  | RegExp {
  const raw = process.env.FRONTEND_ORIGIN?.trim();
  if (raw) {
    return raw
      .split(',')
      .map((o) => o.trim())
      .filter(Boolean);
  }
  if (process.env.NODE_ENV === 'production') {
    throw new Error('FRONTEND_ORIGIN es obligatorio en producción');
  }
  return ['http://localhost:4200', 'http://127.0.0.1:4200'];
}
