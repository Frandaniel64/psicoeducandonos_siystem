# Sistema Psicoeducándonos

Este proyecto consiste en la modernización y evolución del sitio web actual [Psicoeducándonos](http://psicoeducandonos.org/) hacia una plataforma/sistema integral para la prestación de **servicios de psicología con enfoque cristiano**.

## 🎯 Objetivo General
Transformar una landing page informativa basada en WordPress en un sistema web robusto que permita gestionar servicios terapéuticos, talleres y acompañamiento online, integrando los valores y la cosmovisión cristiana.

## 🚀 Características Claves (Propuestas)
Para pasar de una "web" a un "sistema", se plantean los siguientes módulos:

1. **Portal de Pacientes:** 
   - Registro e inicio de sesión.
   - Historial de citas y seguimiento.
   - Acceso a recursos y talleres psicoeducativos con enfoque cristiano.
2. **Gestión de Citas (Scheduling):**
   - Calendario interactivo para agendar sesiones.
   - Recordatorios automáticos (Email/WhatsApp).
3. **Portal del Terapeuta/Administrador:**
   - Gestión de expedientes de pacientes.
   - Administración de horarios y disponibilidad.
   - Creación y edición de contenido para el sitio público.
4. **Módulo de Pagos:**
   - Integración con pasarelas de pago para cobrar consultas y talleres.

## 🛠 Stack Tecnológico y Arquitectura
Tras la fase de análisis, se ha definido construir el sistema utilizando un ecosistema **Full-Stack basado en TypeScript e integrado en un entorno Docker**:

- **Frontend (Web y Portales):** Angular (ideal para interfaces robustas y formularios complejos).
- **Backend (API y Reglas de Negocio):** NestJS.
- **Base de Datos:** PostgreSQL.
- **Gestión de Contenidos (CMS Médico):** Editor integrado en el sistema (el paciente y el terapeuta interactúan en el mismo entorno centralizado).
- **Despliegue Local:** Docker Compose para orquestar la DB, Front y Back al mismo tiempo.

---
> Estado actual: Definiendo la estructura de repositorios (Monorepo vs Multi-repo) para iniciar la configuración de los contenedores Docker y el esqueleto de la aplicación.
