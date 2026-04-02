# Briefing UX/UI: Portal Privado del Paciente
**Proyecto:** Sistema Psicoeducándonos
**Usuario Objetivo:** Pacientes (Clientes) buscando terapia o que ya están en proceso activo.
**Objetivo Visual:** Mantener un estado anímico de paz y claridad extrema. Evitar botones rojos agresivos o diseños recargados. Las interfaces deben sentirse seguras, como una bóveda privada.

---

## 🎨 Pantallas a Diseñar (Flujos del Cliente)

### 1. Onboarding y Panel Principal (Dashboard)
*El refugio central del usuario.*
- **Mensaje de Bienvenida:** Saludo cálido basado en la hora (Ej. "Buenos días, Mariana").
- **Widget de Próxima Cita:** Una caja destacada que muestre:
  - Foto y nombre del terapeuta asignado.
  - Fecha y cuenta regresiva.
  - **Estado:** (Ej. "Esperando aprobación de pago" o "Cita Confirmada").
  - **Botón de Acceso:** "Entrar a Sala Virtual" (Solo se activa 10 minutos antes).
- **Métricas Emocionales (Opcional):** Un pequeño widget donde reporte cómo se siente hoy (Emojis: ☀️, 🌥️, 🌧️) para el historial del doctor.

### 2. Flujo de Agendamiento (Paso a Paso)
*Debe ser un proceso de compra/reserva libre de fricciones.*
- **Paso A (Directorio):** Elegir un profesional (ver foto, bio, y tarifa).
- **Paso B (Calendario):** Seleccionar un día de las "fechas habilitadas" del doctor.
- **Paso C (Checkout P2P):** **[CRÍTICO]** 
  - Visualizar los datos bancarios exactos del doctor elegido (MercadoPago, Zelle, Binance).
  - Un área grande de "Drag & Drop" (Arrastrar y Soltar) que diga: *"Sube la captura de tu transferencia aquí"*.
  - Un botón final: "Enviar Comprobante y Agendar".
- **Paso D (Éxito):** Pantalla de celebración indicando que el terapeuta está revisando el pago.

### 3. Sala de Recursos (Bóveda Psicoeducativa)
*El material extraído de las sesiones.*
- **Grilla de Materiales:** Archivos (PDFs, audios mp3) asignados directamente por su terapeuta para trabajar en la semana.
- Iconografía clara para "Descargar" o "Ver online".

### 4. Historial Médico y Citas Pasadas
- Lista o formato *Timeline* (Línea de tiempo) de todas las sesiones que ha tomado históricamente.
- Posibilidad de descargar el comprobante de aprobación por si lo necesita para su seguro médico.

### 5. Configuración de Cuenta y Seguridad
- Zona para modificar su contraseña (escondiendo los datos fuertemente protegiendo su vulnerabilidad).
- Actualizar contacto de emergencia.

---

## 📌 Reglas de UX para Dispositivos Móviles (Mobile-First)
1. **Flujo Carga de Pago Móvil:** El botón de "Subir Comprobante" en el Checkout P2P debe invocar preferiblemente la Cámara o la Galería nativa del celular directamente (diseño de recuadro enorme, no un botón microscópico).
2. **Navegación Inferior (Bottom-Bar):** En versión celular, en lugar de un menú lateral engorroso, usar una barra inferior de navegación (Estilo Instagram/Spotify): *Home | Agendar | Recursos | Perfil*. 
3. **Privacidad Visual:** Un botón rápido tipo "Cerrar sesión" siempre visible, para usuarios que acceden desde lugares donde desean que su información médica se oculte inmediatamente al soltar el celular.
