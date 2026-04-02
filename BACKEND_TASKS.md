# Plan de Trabajo Backend (NestJS + PostgreSQL)

Este documento enumera las tareas requeridas para construir el motor de reglas de negocio y almacenamiento del Sistema Psicoeducándonos.

## 📦 Fase 1: Arquitectura y Base de Datos
- [x] Configurar conexión con **PostgreSQL** mediante TypeORM (o Prisma).
- [ ] Crear el esquema inicial de entidades en la base de datos basándose en los módulos definidos.
- [ ] Configurar validadores globales (`class-validator` y `class-transformer` de NestJS).

## 🔐 Fase 2: Autenticación y Usuarios Internos (Staff)
- [ ] Construir la entidad `User` para administración (Campos: Id, Email, Password, Nombres, Rol [ADMIN, TERAPEUTA]).
- [ ] Construir la entidad separada `Patient` (Campos: Id, Email, Password, Nombres, Teléfono). Los pacientes no se mezclan con los usuarios del panel.
- [ ] Módulo **Auth**: Implementar Login independiente (Login de Staff vs Login de Pacientes).
- [ ] Módulo **Users**: Endpoints de CRUD para administración de cuentas y actualización de perfil, protegiendo rutas sensibles con `Guards`.

## 🩺 Fase 3: Módulo Clínico (Gestión Privada)
- [ ] Crear entidad `ClinicalRecord` (Historia Clínica) enlazada de 1:1 a un `User` (Paciente).
- [ ] Diseñar endpoint para que el terapeuta registre **Notas de Evolución** encriptadas o privadas.
- [ ] Diseñar endpoint para asignar Cuestionarios Iniciales (ansiedad, estrés, depresión) a un paciente.

## 📅 Fase 4: Agendamiento (Appointments)
- [ ] Crear entidad `Appointment` (Campos: Fecha, Estado, Tipo [Presencial/Online], Enlace de Reunión).
- [ ] Lógica para validar que un terapeuta no tenga solapamientos de horario (Conflictos de citas).
- [ ] Endpoints para: *Agendar*, *Posponer* y *Cancelar* cita.

## 📰 Fase 5: Módulo de Contenido (CMS)
- [ ] Crear entidades: `Article` (Título, Contenido HTML/Markdown, Portada, Estado [Draft/Published]) y `Category`.
- [ ] Endpoints **Públicos** (GET) rápidos para consumir el blog (con soporte de páginado para el frontend).
- [ ] Endpoints **Privados** (POST/PUT/DELETE) exclusivos para el rol `TERAPEUTA` y `ADMIN` para crear los posts.

## 💳 Fase 6: Integraciones Finales (Opcional MVP)
- [ ] Stripe / MercadoPago API: Crear intención de cobro antes de confirmar `Appointment`.
- [ ] Envío de correos automáticos (Resend/Nodemailer) cuando se confirme una cita.
