# Plan de Trabajo Frontend (Angular)

Este documento detalla las tareas secuenciales para armar la interfaz pública, el CMS y los portales privados del usuario en *Psicoeducándonos*.

## 🎨 Fase 1: Arquitectura y Sistema de Diseño
- [ ] Instalar y configurar **Tailwind CSS**.
- [ ] Definir variables base en Tailwind: Paletas de colores (cálidas, acogedoras, cristianas), tipografías y sombras estáticas.
- [ ] Configurar el **AppRoutingModule** (Routing) base de Angular (Caminos para: `/auth`, `/paciente`, `/terapeuta`, `/blog`).
- [ ] Configurar un HTTP Interceptor para inyectar automáticamente el token JWT en todas las peticiones hacia NestJS.

## 🌍 Fase 2: Área Pública (Marketing & Blog)
- [ ] **Componente Home/Landing**: Diseño de la página principal orientada a la conversión, detallando los servicios, enfoques y llamadas a la acción (CTA).
- [ ] **Pared de Artículos (Blog List)**: Diseño de formato cuadrícula para visualizar los artículos/talleres publicados por los profesionales.
- [ ] **Vista Individual de Artículo**: Procesador de marcado visual que lea correctamente el contenido en HTML y lo estructure armónicamente.

## 🔐 Fase 3: Portal de Autenticación
- [ ] Vistas de `Login` y `Registration`.
- [ ] Lógica de Guardias de Rutas (`AuthGuard`) para redireccionar usuarios si no están logueados o proteger el CMS contra intrusos.

## 🧑‍🤝‍🧑 Fase 4: Portal del Paciente (Client Dashboard)
- [ ] Crear el `LayoutPaciente` (Menú lateral o superior simplificado).
- [ ] **Panel de Citas**: Visualizador en modo lista o tarjeta de las próximas citas con botón para "Entrar a Videollamada".
- [ ] **Flow de Agendamiento**: Componente de calendario interactivo para elegir un terapeuta, ver sus días disponibles y pagar la consulta.
- [ ] **Biblioteca**: Un muro donde el paciente descargará los recursos que el terapeuta asigne (PDFs, devocionales, etc.).

## 👩‍⚕️ Fase 5: Portal del Terapeuta (CMS & Clínico)
- [ ] Crear `LayoutTerapeuta` (Navegación potente enfocada a la gestión).
- [ ] **Gestión de Citas (Calendario General)**: Ver el día/semana en modo cuadrícula para tener panorama total de horas de trabajo.
- [ ] **Panel de Pacientes**: Vista que liste sus pacientes a cargo y, al dar click, desglose el perfil y permita llenar la *Historia Clínica* de forma simple.
- [ ] **Editor del CMS**: Integrar una librería de texto enriquecido (Ej. *Quill.js* o *TipTap*) dentro de un formulario Reactivo de Angular donde el terapeuta podrá publicar sus posts psicoeducativos.
