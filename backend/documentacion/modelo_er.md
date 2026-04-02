# Modelo Entidad-Relación (ER) - Psicoeducándonos

Este documento ilustra y define la base de datos relacional para el sistema, utilizando la separación de responsabilidades entre el **Staff (Usuarios del panel)** y los **Clientes (Pacientes públicos)**.

```mermaid
erDiagram
    %% ==========================================
    %% 1. ENTIDADES DE AUTENTICACIÓN E IDENTIDAD
    %% ==========================================
    
    %% Staff Interno (Admins y Psicólogos)
    USER {
        uuid id PK
        string email "Email institucional / único"
        string password "Hash Bcrypt"
        enum role "ADMIN, TERAPEUTA"
        string firstName
        string lastName
        jsonb paymentMethods "Ej: {binance: 'id...', zelle: 'correo'}"
        boolean isActive
    }

    %% Clientes / Pacientes Públicos
    PATIENT {
        uuid id PK
        string email "Email personal / único"
        string password "Hash Bcrypt (Si tiene cuenta)"
        string firstName
        string lastName
        string phone
        string emergencyContact
        datetime createdAt
    }
    
    %% ==========================================
    %% 2. NÚCLEO CLÍNICO Y OPERATIVO
    %% ==========================================

    %% Historia Clínica (Aislada del perfil público)
    CLINICAL_RECORD {
        uuid id PK
        uuid patientId FK "Único por Paciente"
        string primaryCondition "Ej. Ansiedad, Depresión M."
        text privateNotes "Notas encriptadas del doctor"
        jsonb assessments "Data de tests psicológicos"
    }

    %% Citas (Unen el mundo Staff con el mundo Patient)
    APPOINTMENT {
        uuid id PK
        uuid patientId FK "Cliente"
        uuid therapistId FK "Staff (rol TERAPEUTA)"
        datetime scheduledAt
        enum status "PENDING, CONFIRMED, CANCELLED, COMPLETED"
        string meetLink "URL de Zoom/Meet"
        text privateNotes "Solo visible para el doctor"
    }

    %% ==========================================
    %% 3. MÓDULO CMS (Contenido Psicoeducativo)
    %% ==========================================

    ARTICLE {
        uuid id PK
        uuid authorId FK "Apunta a USER (Staff)"
        uuid categoryId FK 
        string title
        string slug "ej. manejo-de-ansiedad"
        text content "Rich text HTML"
        enum status "DRAFT, PUBLISHED"
        datetime publishedAt
    }

    CATEGORY {
        uuid id PK
        string name "Ej. Vida Cristiana"
        string slug 
    }

    %% Relaciones
    PATIENT ||--o| CLINICAL_RECORD : "tiene"
    PATIENT ||--o{ APPOINTMENT : "asiste a"
    USER ||--o{ APPOINTMENT : "imparte (doctor)"
    USER ||--o{ ARTICLE : "publica (autor)"
    CATEGORY ||--o{ ARTICLE : "contiene"
```

## Resumen de Reglas de Negocio
1. **Separación de Identidad:** Un `PATIENT` nunca puede acceder al panel administrativo, por diseño su inicio de sesión irá a otra tabla. 
2. **Historias Clínicas:** Extraídas en un modelo `1:1` con el `PATIENT` para que los datos extremadamente sensibles puedan tener políticas de encriptación separadas.
3. **Citas (Appointments):** Actúan como la tabla pivote de actividad. Requieren obligatoriamente la existencia de un `USER` (Doctor) y un `PATIENT` (Cliente).
