# Arquitectura Técnica: Sistema Psicoeducándonos

Este documento describe la arquitectura elegida (Opción A: Monorepo Full-Stack) para el ecosistema del proyecto.

## 🏗️ Topología del Sistema
El sistema se divide en **tres capas principales**, orquestadas mediante Docker:

1. **Capa de Presentación (Frontend - Angular):**
   - **Tecnología:** Angular 17/18+.
   - **Responsabilidades:** Interfaz de usuario pública (Landing page, Blog) y privada (Portal de pacientes y Portal clínico/CMS).
   - **Comunicación:** Realiza peticiones HTTP (REST/GraphQL) hacia el Backend. Se utilizarán `Interceptors` de Angular para adjuntar el JWT de autenticación.

2. **Capa de Lógica de Negocio (API Backend - NestJS):**
   - **Tecnología:** NestJS (Node.js) con TypeScript.
   - **Responsabilidades:** Autenticación (JWT), endpoints seguros para CRUD de pacientes, agendamiento de citas, y endpoints para publicar/editar los artículos del CMS.
   - **ORM:** Prisma o TypeORM para interactuar con la base de datos de manera segura y tipada.

3. **Capa de Datos (PostgreSQL):**
   - **Tecnología:** PostgreSQL v15.
   - **Responsabilidades:** Almacenamiento persistente, seguro y relacional de usuarios, expedientes clínicos, facturación y artículos del blog.

## 📂 Organización del Monorepo
El código fuente reside en un único repositorio que permite estandarización.

```
/psicoeducandonos_sistema
│
├── frontend/             <-- Código de la aplicación Angular principal.
├── backend/              <-- Código de la API Rest en NestJS.
├── shared/               <-- (Opcional) Interfaces y DTOs legibles por Front y Back.
├── docker-compose.yml    <-- Orquestador de desarrollo local.
├── ARCHITECTURE.md       <-- Este documento.
└── README.md             <-- Documento general del proyecto.
```

## 🔒 Autorización y Roles
- **Paciente:** Puede reservar citas, ver historial propio y dejar comentarios.
- **Psicólogo:** Puede acceder al **CMS Integrado** para crear artículos, ver a sus pacientes y gestionar historias clínicas.
- **Admin:** Control total de la plataforma, roles y usuarios en el sistema.

## 🐳 Entorno Docker
El sistema corre de forma nativa en contenedores para aislar los entornos mediante `docker-compose up`. Esto soluciona el problema "en mi máquina sí funciona".
