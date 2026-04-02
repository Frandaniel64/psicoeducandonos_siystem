# Briefing UX/UI: Dashboard de Terapeutas (Prestadores)
**Proyecto:** Sistema Psicoeducándonos
**Usuario Objetivo:** Psicólogos Clínicos (Uso interno / 6-8 horas diarias)
**Objetivo Visual:** Crear una interfaz que disminuya la carga cognitiva, transmita orden, paz (usando paletas de colores cálidas/celestiales corporativas) y maximice la eficiencia operativa entre sesión y sesión.

---

## 🎨 Pantallas a Diseñar (Flujos Principales)

### 1. Pantalla Principal (Home / Resumen Diario)
*El "Centro de Comando" al iniciar el día.*
- **Sección de Próxima Cita:** Una "Card" prominente que indique "Siguiente Paciente: [Nombre] en [15 mins]".
- **Call-to-Action Principal (Botón Primario):** Iniciar Videollamada / Entrar a Sala.
- **Agenda del Día (Timeline):** Lista vertical o cronograma visual del resto de sesiones del día.
- **Widgets de Analítica Rápida:** 
  - Pacientes atendidos esta semana.
  - Tareas o notas médicas pendientes de subir.

### 2. Módulo de Agenda y Calendario
*Herramienta visual para manejar el tiempo.*
- **Vista de Calendario:** Selector modo "Semana/Día/Mes".
- **Gestión de Disponibilidad:** Panel lateral o modal donde el terapeuta enciende o apaga días/horas libres (Ej. "Bloquear todos los lunes por la mañana").
- **Estados de Cita:** Diferenciar visualmente (mediante colores o etiquetas) citas *Confirmadas*, *Pendientes de pago* y *Canceladas*.

### 3. Directorio de Pacientes (Expediente Electrónico)
*El tarjetero médico digital del doctor.*
- **Vista de Lista:** Tabla o Grilla con búsqueda rápida por nombre y filtros (Pacientes activos vs inactivos).
- **Vista de Perfil de Paciente:**
  - Datos de contacto y contacto de emergencia.
  - Formulario de Ingreso (Motivo original de consulta).
  - Listado histórico de citas pasadas.
- **Historia Clínica (Bóveda Privada):** Sección tipo "Blog de notas" anclada al paciente donde el doctor registra la evolución terapéutica (Notas que el paciente *nunca* verá).

### 4. Módulo de Envío de Recursos 
*La herramienta psicoeducativa de "Tareas" post-sesión.*
- **Buscador de Materiales:** Catálogo interno (PDFs, audios, tests).
- **Flujo de Envío:** Un botón rápido para "Asignar Recurso" que emita el archivo hacia el portal del paciente.

### 5. CMS Privado (Panel de Publicación de Artículos)
*Herramienta de marketing orgánico del terapeuta.*
- **Lista de Artículos:** Tabla de posts escritos por el autor indicando estado (*Draft / Publicado*).
- **Editor (WYSIWYG):** Interfaz limpia, similar a *Notion* o *Medium*, para escribir texto enriquecido, subir foto de portada y asignarle una etiqueta (Ej: "Manejo de Estrés").

### 6. Configuración General y Perfil Público
*La carta de presentación del terapeuta hacia la web pública.*
- Zona para subir la "Foto de Perfil Profesional" (Opciones de Crop/Recorte).
- Editor Biográfico: Texto que verán los clientes al elegirlo.
- Preferencias de notificación y ajustes cuenta.

---

## 📌 Requerimientos Técnicos para el Diseñador
1. **Empty States (Estados Vacíos):** Diseñar cómo se ven todas las pantallas cuando no hay data (Ej. *"Aún no tienes pacientes asignados"*, acompañado de una micro-ilustración amigable).
2. **Sistema de Grid:** Diseñar priorizando la versión Desktop (1440px / 1920px), ya que el doctor trabajará principalmente en su laptop/computadora de escritorio, con una versión Mobile-Friendly secundaria para el calendario.
3. **Componentes Reutilizables:** Crear un "Side-Menu" (Menú lateral izquierdo) colapsable para la navegación, y una barra superior (Top-bar) para el perfil rápido y notificaciones.
