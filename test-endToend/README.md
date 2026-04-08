# test-endToend

Aquí el agente **e2e-docker-browser** (y quien ejecute su flujo) deja **constancia escrita** de cada corrida: qué se probó, cómo, resultado y **hallazgos con checkboxes** para ir cerrando tareas a medida que se corrige el código.

## Convención de archivos

| Ubicación | Uso |
|-----------|-----|
| `runs/YYYY-MM-DD-<slug>.md` | Un archivo por corrida o foco (ej. `2026-04-08-home-ctas.md`). Si el mismo día repites el mismo tema, añade una sección **Actualización** con hora o usa `YYYY-MM-DD-HHmm-<slug>.md`. |
| `_plantilla.md` | Plantilla copiable; no es un informe de ejecución. |

## Cómo usar los checkboxes

- **`[ ]`** = pendiente (sirve para abrir tarea en tu tablero o backlog).
- **`[x]`** = corregido y **verificado** (idealmente en una re-ejecución E2E documentada en el mismo archivo o en un run posterior).
- En **Resultados OK**, usa `[x]` solo cuando el comportamiento quedó comprobado en esa sesión.

Los IDs tipo **H-001** ayudan a referenciar el mismo hallazgo en PRs y commits.

## Qué no va aquí

- Secretos, tokens ni datos personales reales.
- Volúmenes enormes de logs: resume y, si hace falta, indica comando para reproducir.
