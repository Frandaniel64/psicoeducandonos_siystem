# Plan de Trabajo Backend (NestJS + PostgreSQL)

Este documento enumera las tareas requeridas para construir el motor de reglas de negocio y almacenamiento del Sistema Psicoeducándonos.

## 📦 Fase 1: Arquitectura y Base de Datos
- [x] Configurar conexión con **PostgreSQL** mediante TypeORM (orquestado con Docker).
- [x] Crear el esquema inicial de entidades en la base de datos basándose en los módulos definidos.
- [x] Configurar validadores globales (`class-validator` y `class-transformer` de NestJS en main.ts).

## 🔐 Fase 2: Autenticación y Usuarios Internos (Staff)
- [x] Construir la entidad `User` para administración (Campos: Id, Email, Password, Nombres, Rol [ADMIN, TERAPEUTA]).
- [x] Construir la entidad separada `Patient` (Campos: Id, Email, Password, Nombres, Teléfono). Los pacientes no se mezclan con los usuarios del panel.
- [ ] Módulo **Auth**: Implementar Login independiente (Login de Staff vs Login de Pacientes) usando JWT.
- [ ] Módulo **Users**: Endpoints de CRUD para administración de cuentas y actualización de perfil, protegiendo rutas sensibles con `Guards`.

## 🩺 Fase 3: Módulo Clínico (Gestión Privada)
- [ ] Crear entidad `ClinicalRecord` (Historia Clínica) enlazada de 1:1 a un `User` (Paciente).
- [ ] Diseñar endpoint para que el terapeuta registre **Notas de Evolución** encriptadas o privadas.
- [ ] Diseñar endpoint para asignar Cuestionarios Iniciales (ansiedad, estrés, depresión) a un paciente.

## 📅 Fase 4: Agendamiento (Appointments)
- [ ] Crear entidad `Appointment` (Campos: Fecha, Estado, Tipo [Presencial/Online], Enlace de Reunión).
- [ ] Implementar Estados de Cita: `PENDING_REVIEW` (Slot bloqueado), `PAYMENT_DELAYED` (Esperando clearing bancario), `CONFIRMED`, `REJECTED`.
- [ ] Lógica de Bloqueo: Al solicitar cita, el espacio se bloquea automáticamente evitando solapamientos. El terapeuta tiene el control total para mantenerla en espera o cancelarla si el pago falla.
- [ ] Endpoint para que el Terapeuta confirme la cita adjuntando el enlace de Google Meet / Zoom en su respuesta.

## 📰 Fase 5: Módulo de Contenido (CMS)
- [ ] Crear entidades: `Article` (Título, Contenido HTML/Markdown, Portada, Estado [Draft/Published]) y `Category`.
- [ ] Endpoints **Públicos** (GET) rápidos para consumir el blog (con soporte de páginado para el frontend).
- [ ] Endpoints **Privados** (POST/PUT/DELETE) exclusivos para el rol `TERAPEUTA` y `ADMIN` para crear los posts.

## 💳 Fase 6: Sistema de Cobro Manual (MVP P2P)
- [ ] Ampliar tabla `User` (o crear `PaymentProfile`) para guardar credenciales P2P (Zelle/Local/Binance).
- [ ] **Guardrail de Negocio:** Lógica en el backend que impida mostrar la agenda de un Terapeuta si no tiene al menos un método de pago P2P validado.
- [ ] Enlace del comprobante (Screenshot) generado directamente dentro del Payload de la reserva.
- [ ] Endpoint para que el terapeuta pueda aprobar el pago (Confirmando la cita) o notificar que el clearing sigue pendiente, disparando alertas por WhatsApp/Email.

## 📤 Fase 7: Almacenamiento de Archivos (Storage)
- [ ] Configurar interceptores (`Multer`) para recibir archivos.
- [ ] Modulo para guardar y servir de manera segura: Comprobantes de Pago P2P (Sensible) y Portadas del Blog / Avatares (Público).
- [ ] Decidir si usar almacenamiento local (en disco) o servicio S3 (AWS/DigitalOcean).

## 🔔 Fase 8: Módulo de Notificaciones
- [ ] Configurar `@nestjs-modules/mailer` o integrador SMTP (Resend/SendGrid) para envío automático de notificaciones.
- [ ] Crear plantillas HTML (con estilo "Sacred Sanctuary") para correos electrónicos (Bienvenida, Pago en Revisión, Envío de Link de Sesión).
