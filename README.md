# Instituto Inteligente · Presentación Semana Informática 2026

Presentación web scrolleable a pantalla completa sobre el proyecto **Instituto Inteligente** del IES Dr. Lluís Simarro: un ecosistema educativo soberano, predictivo y personalizado basado en IA local, sin dependencia de la nube externa.

Diseñada con la identidad visual de la **Semana Informática 2026** — *Tecnología con propósito: diseñando el futuro digital* (21–23 abril 2026).

## Secciones

1. **Portada** — Hero con trails de luz animados
2. **Visión** — Cuatro pilares: soberanía del dato, personalización, latencia, eficiencia
3. **Hardware** — Clúster híbrido (Nodos DGX Spark + Nodo Titán)
4. **Red** — Sistema nervioso en 4 capas (Core / Enlaces / Nodos / Acceso)
5. **Rendimiento** — Punto óptimo del LLM (Qwen 3 80B MoE)
6. **RAGs departamentales** — Pilar educativo #1
7. **Agentes IA individualizados** — Pilar educativo #2
8. **Piloto DAM** — Generación y corrección de exámenes con IA (1.º DAM · Programación y módulos afines)
9. **Aula Invertida 2.0** — Modelo tradicional vs. proactivo
10. **Ecosistema** — Proyecto Centinela Plus + AI Secure Campus
11. **Futuro** — Blueprint escalable para la educación pública

## Stack

- HTML + CSS + JavaScript vanilla — cero dependencias de build
- SVG animado (stroke-dasharray, filter glow)
- IntersectionObserver para reveals y contadores
- Google Fonts (Inter, Space Grotesk, JetBrains Mono)

## Uso

```bash
# Abrir directamente en el navegador
open index.html    # macOS
start index.html   # Windows

# O servirlo en local
python -m http.server 8000
```

### Navegación por teclado

| Tecla                 | Acción                 |
| --------------------- | ---------------------- |
| ↓ / PgDn / Espacio    | Siguiente sección      |
| ↑ / PgUp              | Sección anterior       |
| Home / End            | Primera / última       |

## Estructura

```
.
├── index.html           # Estructura de las 10 secciones
├── styles.css           # Paleta SI2026 + animaciones
├── script.js            # Scroll, contadores, observers
├── logo-simarro.webp    # Logo IES Dr. Lluís Simarro
├── spark-1.webp         # Imagen nodo de inferencia
└── titan.webp           # Imagen nodo de entrenamiento
```

## Licencia

Apache-2.0 — Proyecto **SOBERANÍA_TEC** del IES Dr. Lluís Simarro.
