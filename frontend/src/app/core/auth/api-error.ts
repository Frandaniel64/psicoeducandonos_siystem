export function readApiError(err: unknown): string {
  if (err && typeof err === 'object' && 'error' in err) {
    const body = (err as { error?: unknown }).error;
    if (body && typeof body === 'object' && body !== null && 'message' in body) {
      const m = (body as { message?: string | string[] }).message;
      if (typeof m === 'string') return m;
      if (Array.isArray(m)) return m.join(', ');
    }
    if (typeof body === 'string') return body;
  }
  return 'No pudimos completar la solicitud. Intenta de nuevo.';
}
