# Briefing UX/UI: Página Pública y Portal de Conversión (Home Page)
**Proyecto:** Sistema Psicoeducándonos
**Usuario Objetivo:** Personas atravesando crisis emocionales, luto, ansiedad o depresión, buscando profesionales que compartan su cosmovisión cristiana.
**Objetivo Visual & Emocional:** Generar un ambiente de **confianza inmediata, esperanza clínica y calidez profunda**. Se busca huir radicalmente del diseño frío de hospital y reemplazarlo con una estética de "refugio seguro". Alta prioridad a la usabilidad para evitar frustrar a un usuario que ya llega con carga mental.

---

## 🎨 Secciones y Bloques de Diseño (Wireframe Funcional)

### 1. Hero Section (Encabezado Principal)
*Debe capturar la atención en menos de 3 segundos.*
- **Copy principal (Inspiración):** "¿Sientes que algo no está bien, pero no sabes por dónde empezar?"
- **Micro-Copy:** "Acompañamiento psicológico online para reconectar contigo mismo y con tu propósito".
- **Composición Visual:** Se sugiere descartar la típica foto genérica de "doctora sonriendo" y usar ilustraciones abstractas, uso de texturas suaves (glassmorphism) o fotografías cálidas y cinematográficas enfocadas en la calma humana.
- **Botón Dual (CTAs):** 
  - Primario (Destacado): "Reserva tu 1° Sesión"
  - Secundario (Sutil): "Explorar Talleres"

### 2. Bloque de Empatía (Muro de Identificación de Síntomas)
*Para que el usuario diga: "Este lugar me entiende".*
- Sistema de **Tarjetas (Cards)** que expongan situaciones cotidianas:
  - *Ansiedad:* (Ej. "Preocupación constante que paraliza").
  - *Depresión:* (Ej. "Falta de sentido o aislamiento social").
  - *Crisis Vital / Burnout:* (Ej. "Agotamiento emocional extremo").
- **UI Tip:** Usar iconografía moderna o emojis suavizados que resten peso clínico al texto.

### 3. Exposición de Módulos de Servicio
*Cómo la clínica resuelve el problema.*
- **Terapia 1 a 1:** Diseño que denote privacidad y cercanía.
- **Talleres Grupales / Workbooks:** Representación visual de recursos descargables o sesiones comunitarias.

### 4. Nuestro Norte (Diferenciador Institucional)
*Aquí integramos sutil y profesionalmente los valores.*
- Texto o sección donde se explica la integración de la **psicología clínica regulada** con los **valores de la fe cristiana**.
- Perfil resumido de los terapeutas (Avatar circular + Mini biografía clínica).

### 5. Galería Dinámica del CMS (El Blog Psicoeducativo)
*Carrusel de las publicaciones más recientes del staff.*
- **Article Cards:** Imágenes de portada redondeadas. Título del artículo, Categoría del mismo (Ej. *Tag azul: "Vida Cristiana"*), fecha y autor.
- Acompañar de un botón sutil: "Leer más artículos".

### 6. Cierre Técnico y Confianza (Footer & FAQs)
- Sección de Acordeón interactivo para resolver objeciones (Preguntas Frecuentes). Ej: *¿Es efectiva la terapia online? ¿Cuáles son los métodos de pago?*
- Diseño de *Floating Action Button* (Botón flotante en esquina inferior) que diga "Hablar con un especialista" y acompañe al scroll del usuario móvil.

---

## 📌 Reglas de UX para Dispositivos Móviles (Mobile-First)
1. **Zonas Táctiles Grandes:** El público afectado por pánico o estrés suele tener menor precisión al hacer *tap* en el teléfono. Los botones de reserva deben medir al menos `48px` de altura.
2. **Jerarquía Tipográfica:** Las fuentes (Ej. *Inter, Poppins, Outfit*) deben leerse perfecto en pantallas pequeñas, usando alto contraste en los testimonios.
3. **Flujo de Agendamiento:** Al dar click en "Reservar Cita", prever que se abrirá un Modal (ventana emergente) simplificado o se redirigirá al "Portal del Paciente" sin distracciones visuales.
