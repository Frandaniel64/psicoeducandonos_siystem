# Documento General del Proyecto: Psicoeducándonos

## 1. Visión General
Transformar el antiguo sitio web WordPress en un Ecosistema digital propietario (Sistema Web) de atención psicológica con **enfoque cristiano**. Debe servir tanto como medio de captación (marketing on-line) como herramienta de gestión hospitalaria (pacientes, agendas y CMS).

## 2. Requerimientos Funcionales por Módulo

### 2.1 Módulo del Portal Público (Marketing y Blog)
- **Landing Page Dinámica:** Home page con servicios, enfoque diferenciador e integración visual atractiva.
- **Blog Psicoeducativo (CMS View):** Sección pública y amigable para SEO donde se consumen los artículos, devocionales o ensayos subidos por los terapeutas o el administrador.

### 2.2 Módulo del Paciente
- **Onboarding/Registro:** Perfilamiento inicial evaluando condiciones (ansiedad, depresión), pudiendo incorporar una óptica espiritual.
- **Gestión de Sesiones:** Poder agendar, reprogramar o cancelar sesiones psicológicas.
- **Bóveda de Recursos:** Acceso a guías, tareas asignadas por el psicólogo (workbooks), y material recomendado.

### 2.3 Módulo del Terapeuta (Dashboard / CMS Autor)
- **Calendario Clínico:** Visualización de pacientes del día.
- **Editor de Historias Clínicas:** Bloc de notas seguro para guardar los expedientes electrónicos de cada paciente de forma cifrada.
- **CMS Interno (Editor de Textos):** Zona donde el terapeuta puede redactar nuevos artículos, agregarles categorías ("Ansiedad", "Depresión", "Vida Cristiana"), subir la imagen de portada y publicar directo en el portal público.

### 2.4 Módulo Administrativo & Operativo
- Control de pagos y facturación.
- Asignación manual o revisión de terapeutas.
- Moderación de los artículos escritos antes de salir al público.

## 3. Experiencia de Usuario (UI/UX)
- Se prioriza un esquema de diseño moderno, usando paletas de colores que transmitan **paz, calidez y frescura** (evitar entornos clínicos fríos).
- Interacciones ágiles tipo SPA (Single Page Application).

## 4. Próximos Pasos (Hoja de Ruta)
1. Levantar el esqueleto del Monorepo (NestJS + Angular).
2. Conectar Prisma/TypeORM con la base de datos PostgreSQL.
3. Crear el modelo de datos (`User`, `Appointment`, `Article`).
4. Generar el módulo de Autenticación.