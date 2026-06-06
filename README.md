# =Formula() 📊

> _Domina Excel como un desarrollador._

---

## Tabla de contenido

0. [Getting Started](#0-getting-started)
1. [Elección del proyecto y problemática que resuelve](#1-elección-del-proyecto-y-problemática-que-resuelve)
2. [Objetivo del desarrollo](#2-objetivo-del-desarrollo)
3. [Tipo de sitio y justificación técnica](#3-tipo-de-sitio-y-justificación-técnica)
4. [Principios UX/UI aplicados](#4-principios-uxui-aplicados)
5. [Sistema de diseño — Design Tokens](#5-sistema-de-diseño--design-tokens)

---

## 0. Getting Started

### Requisitos

No hay dependencias ni build tools. Solo necesitas:

- Un navegador moderno (Chrome, Firefox, Edge)
- Git
- Un editor de código (VS Code recomendado)
- Extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) para VS Code _(opcional pero recomendada)_

---

### Instalación local

```bash
# 1. Clona el repositorio
git clone https://github.com/capitan-grizzly/=Formula-.git

# 2. Entra al directorio
cd =Formula-

# 3. Abre en VS Code
code .
```

Para correr el proyecto localmente tienes dos opciones:

**Opción A — Live Server (recomendada):**
Click derecho sobre `index.html` → _Open with Live Server_
El sitio estará disponible en `http://127.0.0.1:5500`

**Opción B — Servidor HTTP de Python:**

```bash
python -m http.server 3000
# Abre http://localhost:3000
```

> **¿Por qué no abrir el `index.html` directo?**
> El proyecto usa ES Modules (`type="module"`). Los navegadores bloquean los módulos cuando se cargan desde `file://` por política CORS. Siempre usa un servidor local.

---

### Estructura del proyecto

```
=Formula-/
├── index.html              # Entry point — shell de la SPA
├── css/
│   ├── style.css           # Estilos globales
│   ├── base.css            # Reset y variables (design tokens)
│   ├── layout.css          # Grid, sidebar, contenedores
│   ├── components.css      # Navbar, cards, badges, botones
│   └── views.css           # Estilos específicos por vista
├── js/
│   ├── main.js             # Inicialización y router
│   ├── components/
│   │   ├── navbar.js
│   │   ├── footer.js
│   │   └── card.js
│   └── views/
│       ├── dashboard.js
│       ├── curriculum.js
│       └── challenges.js
├── .gitignore
└── README.md
```

---

### Demo en vivo

El proyecto está desplegado en GitHub Pages:

🔗 **[capitan-grizzly.github.io/=Formula-/](https://capitan-grizzly.github.io/=Formula-/)**

---

### Flujo de trabajo con Git

```bash
# Ver estado de cambios
git status

# Agregar todos los cambios
git add .

# Commit con mensaje descriptivo
git commit -m "feat: descripción de lo que hiciste"

# Push al repositorio remoto
git push
```

Convención de commits usada en este proyecto: **[Conventional Commits](https://www.conventionalcommits.org/)**

| Prefijo     | Uso                                        |
| ----------- | ------------------------------------------ |
| `feat:`     | Nueva funcionalidad                        |
| `fix:`      | Corrección de bug                          |
| `style:`    | Cambios visuales / CSS                     |
| `refactor:` | Restructura de código sin cambio funcional |
| `docs:`     | Cambios en documentación                   |
| `chore:`    | Configuración, gitignore, etc.             |

---

## 1. Elección del proyecto y problemática que resuelve

### 1.1 Nombre del proyecto

**ExcelPath** — una plataforma interactiva de aprendizaje de Excel estructurada en lecciones progresivas y retos técnicos clasificados por dificultad, inspirada en el enfoque y la experiencia de usuario de plataformas como LeetCode, SQLBolt y Learn Git Branching.

---

### 1.2 Contexto y problemática

Excel es, a día de hoy, una de las herramientas más demandadas en entornos laborales y académicos. Sin embargo, la curva de aprendizaje real está fragmentada y mal resuelta por los recursos actuales.

| #   | Problema                              | Descripción                                                                                                                      |
| --- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Recursos pasivos**                  | Video-tutoriales donde el usuario observa pero no practica en el mismo entorno. El aprendizaje no se consolida.                  |
| 2   | **Falta de progresión estructurada**  | No existe un sistema de niveles comparable al que usan plataformas de programación.                                              |
| 3   | **Ausencia de contexto profesional**  | Los ejercicios son artificiales. No replican escenarios reales: análisis de ventas, reportes financieros, dashboards operativos. |
| 4   | **Sin entorno de práctica inmediata** | El usuario necesita abrir Excel por separado. Esa fricción destruye el flujo de aprendizaje.                                     |
| 5   | **Experiencia de usuario anticuada**  | Plataformas como ExcelExercises.com no comunican progreso, no gamifican, no generan hábito.                                      |

### 1.3 ¿Qué resuelve ExcelPath?

- **Teoría contextualizada**: cada concepto se explica con simulación visual del comportamiento dentro de una hoja de cálculo.
- **Práctica inmediata**: el usuario resuelve directamente en la plataforma con corrección automática.
- **Progresión de dificultad**: Beginner → Intermediate → Advanced → Expert.
- **Retos con contexto real**: los challenges simulan situaciones profesionales (reportes de ventas, análisis financiero, limpieza de datos).
- **Efficiency Score**: no solo se valida que la solución sea correcta — se puntúa qué tan óptima es la fórmula utilizada (ver sección 1.4).
- **UX moderna orientada al perfil técnico**: diseño oscuro, sintaxis resaltada, progreso visible.

### 1.4 Efficiency Score — diferencial clave ⚡

Inspirado en las métricas de complejidad de LeetCode (time/space complexity), ExcelPath introduce el **Efficiency Score**: una puntuación adicional que evalúa no solo si la solución es correcta, sino si la fórmula utilizada es la más óptima para el problema.

#### ¿Cómo funciona?

Cada reto define una solución de referencia y un árbol de alternativas válidas con su respectivo score:

```
Challenge: "Busca el precio de un producto por su código"

✅ Correcta + Eficiente   → BUSCARX(...)                          → Efficiency: 100/100
✅ Correcta + Aceptable   → INDICE(COINCIDIR(...))                → Efficiency:  75/100
✅ Correcta + Subóptima   → BUSCARV(..., 3, 0)                    → Efficiency:  50/100
✅ Correcta + Antipatrón  → BUSCARV anidado × 10 columnas         → Efficiency:  20/100
❌ Incorrecta             → cualquier resultado incorrecto         → Efficiency:   0/100
```

#### Criterios de evaluación del score

| Criterio                      | Descripción                                                                                   |
| ----------------------------- | --------------------------------------------------------------------------------------------- |
| **Modernidad de la función**  | Funciones nuevas (BUSCARX, APILARV, UNIRCADENAS) sobre legacy (BUSCARV, CONCATENAR)           |
| **Complejidad de la fórmula** | Menos operaciones para el mismo resultado = más eficiente                                     |
| **Volatilidad**               | Evitar funciones volátiles (AHORA, HOY, DESREF) salvo que sean necesarias                     |
| **Dependencia de columnas**   | Evitar hardcodear posiciones de columna                                                       |
| **Rango de acción**           | Fórmulas que escalan bien (referencias estructuradas, tablas) sobre referencias de celda fija |

#### Impacto en la experiencia del usuario

- El score se muestra al completar el reto con desglose visual (como las llamas de Duolingo pero técnico).
- Un reto "resuelto" con score bajo invita al usuario a intentar optimizar — sin forzarlo.
- El perfil del usuario muestra su **Efficiency Average** como métrica de madurez técnica.
- Los challenges del nivel Expert requieren un mínimo de Efficiency Score para considerarse superados.

---

## 2. Objetivo del desarrollo

### 2.1 Objetivo general

Desarrollar una plataforma web interactiva que permita aprender y dominar Microsoft Excel de forma progresiva, práctica y autodirigida, a través de lecciones estructuradas, retos técnicos con corrección automática y un sistema de Efficiency Score que incentive el uso de las fórmulas más óptimas.

### 2.2 Objetivos específicos

#### Frontend — Fase 1 (entregable actual)

- [ ] Diseñar y desarrollar las 5 pantallas principales: `Landing`, `Learn`, `Lesson View`, `Challenges`, `Challenge View`.
- [ ] Implementar navegación SPA con mapa de rutas definido.
- [ ] Establecer el sistema de diseño base: tokens de color, tipografía, componentes reutilizables.
- [ ] Construir la interfaz del simulador de hoja de cálculo embebido.
- [ ] Implementar el componente visual del **Efficiency Score** (ring chart + desglose).
- [ ] Garantizar responsividad para escritorio, tablet y móvil.

#### Backend — Fase 2

- [ ] API REST para lecciones, retos, usuarios y progreso.
- [ ] Motor de validación automática + cálculo de Efficiency Score.
- [ ] Sistema de autenticación y perfil de usuario.

#### Producto completo — Fase 3+

- [ ] Sistema de racha diaria (streak) y gamificación.
- [ ] Panel de progreso con métricas individuales (Efficiency Average, categorías dominadas).
- [ ] Modo empresa para asignación de rutas de aprendizaje.

### 2.3 Alcance del Entregable 2 (este documento)

- Principios UX/UI aplicados al proyecto.
- Sistema de diseño (design tokens: colores, tipografía, espaciado).
- Prompts para prototipado en Stitch (pantalla por pantalla).

---

## 3. Tipo de sitio y justificación técnica

### 3.1 Decisión: SPA (Single Page Application)

ExcelPath se construye como una **Single Page Application** con rendering del lado del cliente (CSR), utilizando HTML + CSS + JavaScript vanilla en Fase 1, preparada para migrar a React / Next.js en Fase 2.

| Tipo           | ¿Aplica? | Razón                                                            |
| -------------- | -------- | ---------------------------------------------------------------- |
| Static Site    | ❌       | Sin interacción ni estado dinámico                               |
| Multi-Page App | ⚠️       | Recargas completas rompen el flujo de práctica                   |
| **SPA**        | ✅       | Navegación fluida, estado persistente, experiencia de app nativa |

### 3.2 Stack tecnológico

```
Fase 1 — Frontend
├── HTML5 semántico
├── CSS3 (Custom Properties, Grid, Flexbox, animaciones)
└── JavaScript ES6+ (módulos, routing SPA, DOM API)

Fase 2+ — Full Stack
├── React + Next.js
├── Node.js + Express / FastAPI
└── PostgreSQL + Prisma ORM
```

---

## 4. Principios UX/UI aplicados

Los siguientes 7 principios de UX (referencia: [Figma Resource Library](https://www.figma.com/resource-library/what-is-ux-design/)) se aplican con decisiones de diseño concretas para ExcelPath:

---

### Principio 1 — Centrado en el usuario

> _El diseño parte de las necesidades reales del usuario, no de las preferencias del diseñador._

**Perfil de usuario primario de ExcelPath:** estudiante universitario o profesional técnico que ya usa plataformas como LeetCode o freeCodeCamp. Conoce la dinámica de "lección + ejercicio", espera feedback inmediato, y valora el progreso visible.

**Decisiones de diseño:**

- Interfaz oscura por defecto (preferred por perfiles tech).
- El simulador de celdas está siempre visible al resolver un reto — no hay que scrollear para verlo.
- La barra de progreso del nivel siempre está presente en la sidebar.

---

### Principio 2 — Consistencia

> _Elementos similares se comportan y lucen igual en toda la plataforma._

**Decisiones de diseño:**

- Un único sistema de design tokens (colores, tipografía, espaciado) aplicado globalmente.
- Los badges de dificultad (Beginner / Intermediate / Advanced / Expert) tienen el mismo color en Learn y en Challenges.
- El patrón `[enunciado | editor | resultado]` es idéntico en Lesson View y Challenge View.
- Los estados de los botones (hover, active, disabled) son idénticos en todos los componentes.

---

### Principio 3 — Jerarquía visual

> _Lo más importante debe verse primero. El ojo del usuario no debe perderse._

**Decisiones de diseño:**

- En `Challenge View`: el enunciado del problema ocupa el panel izquierdo completo (peso visual máximo). El editor va al centro. El Efficiency Score aparece solo al enviar (no distrae antes).
- En `Learn`: el título de la lección activa se destaca con acento de color. Las lecciones completadas se atenúan visualmente.
- En la `Landing`: un solo CTA principal ("Start Learning — Free") con jerarquía tipográfica clara: headline → subheadline → CTA.

---

### Principio 4 — Contexto

> _El diseño debe adaptarse al momento y al estado en que se encuentra el usuario._

**Decisiones de diseño:**

- Si el usuario está en una lección de nivel Beginner, la sidebar no muestra las lecciones de Expert (reduce ruido cognitivo).
- Al completar un reto con Efficiency Score bajo, aparece un tooltip contextual: _"¿Sabías que BUSCARX hace lo mismo en una sola línea?"_.
- El estado de cada lección (bloqueada, disponible, en curso, completada) se comunica visualmente sin texto adicional.

---

### Principio 5 — Control del usuario

> _El usuario debe sentir que él controla la experiencia, no al revés._

**Decisiones de diseño:**

- El usuario puede intentar un challenge tantas veces como quiera — no hay penalización por intentos.
- Existe un botón "Ver pista" que revela ayuda gradual (pista 1 → pista 2 → solución parcial), pero reduce el Efficiency Score máximo alcanzable en ese intento.
- El usuario puede abandonar una lección y retomarla desde el punto exacto donde la dejó.
- Modo "práctica libre": el usuario puede resolver un reto sin que el resultado afecte sus métricas.

---

### Principio 6 — Accesibilidad

> _El diseño debe ser usable por la mayor cantidad de personas posible._

**Decisiones de diseño:**

- Contraste mínimo de 4.5:1 entre texto y fondo (WCAG AA).
- Todos los elementos interactivos son alcanzables por teclado (`Tab`, `Enter`, `Esc`).
- Los colores de estado (éxito, error, warning) nunca son el único indicador — siempre acompañados de ícono o texto.
- Tipografía mínima de 14px para texto secundario, 16px para cuerpo.
- El simulador de celda permite zoom accesible en dispositivos táctiles.

---

### Principio 7 — Usabilidad

> _El usuario debe poder completar sus objetivos sin fricción, sin manual, sin frustrarse._

**Decisiones de diseño:**

- Onboarding de 3 pasos al registrarse: selección de nivel inicial → primer reto de prueba → dashboard.
- El tiempo estimado de cada lección aparece en la card antes de entrar.
- Los errores en el editor de fórmulas muestran exactamente qué está mal y dónde (como un linter).
- El Efficiency Score se explica la primera vez que aparece con un tooltip educativo breve.

---

## 5. Sistema de diseño — Design Tokens

Estos tokens son la fuente de verdad para el prototipo en Stitch y para el código CSS posterior.

### 5.1 Paleta de colores

```css
/* Fondos */
--color-bg-base: #0d1117; /* Fondo principal */
--color-bg-surface: #161b22; /* Cards, paneles, sidebar */
--color-bg-elevated: #1c2128; /* Modales, dropdowns */
--color-border: #30363d; /* Bordes generales */
--color-border-subtle: #21262d; /* Separadores sutiles */

/* Texto */
--color-text-primary: #e6edf3; /* Texto principal */
--color-text-secondary: #8b949e; /* Texto secundario, placeholders */
--color-text-disabled: #484f58; /* Elementos deshabilitados */

/* Acento principal — Excel Green */
--color-accent: #00c896; /* Botones CTA, progreso activo */
--color-accent-hover: #00a87e; /* Hover del acento */
--color-accent-subtle: #00c89620; /* Fondos de highlight */

/* Estados */
--color-success: #3fb950; /* Reto completado, correcto */
--color-warning: #d29922; /* Pista activada, score medio */
--color-error: #f85149; /* Respuesta incorrecta */
--color-info: #58a6ff; /* Tooltips, info */

/* Efficiency Score */
--color-efficiency-s: #ffd700; /* S-rank: 90–100 */
--color-efficiency-a: #00c896; /* A-rank: 75–89  */
--color-efficiency-b: #58a6ff; /* B-rank: 50–74  */
--color-efficiency-c: #d29922; /* C-rank: 25–49  */
--color-efficiency-d: #f85149; /* D-rank: 0–24   */

/* Dificultad */
--color-beginner: #3fb950;
--color-intermediate: #58a6ff;
--color-advanced: #d29922;
--color-expert: #f85149;
```

### 5.2 Tipografía

```
Display / Headings:  "Sora"          — Google Fonts
Body / UI:           "Plus Jakarta Sans" — Google Fonts
Código / Fórmulas:   "JetBrains Mono"   — Google Fonts

Escala tipográfica:
--text-xs:   12px / 1.4
--text-sm:   14px / 1.5
--text-base: 16px / 1.6
--text-lg:   18px / 1.5
--text-xl:   22px / 1.4
--text-2xl:  28px / 1.3
--text-3xl:  36px / 1.2
--text-4xl:  48px / 1.1
```

### 5.3 Espaciado (base 4px)

```
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  20px
--space-6:  24px
--space-8:  32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
--space-20: 80px
```

### 5.4 Border radius

```
--radius-sm:   4px   /* Badges, inputs pequeños */
--radius-md:   8px   /* Cards, botones */
--radius-lg:   12px  /* Modales, paneles */
--radius-xl:   16px  /* Tarjetas grandes */
--radius-full: 9999px /* Pills, avatares */
```

---

## Estado del proyecto

| Entregable                                            | Estado         |
| ----------------------------------------------------- | -------------- |
| 1. Definición del proyecto, objetivos y tipo de sitio | ✅ Completado  |
| 2. Principios UX/UI + Sistema de diseño               | ✅ Completado  |
| 3. Prototipado de pantallas (Stitch)                  | 🔄 En progreso |
| 4. Estructura de carpetas y mapa de navegación        | ⏳ Pendiente   |
| 5. HTML, CSS y JS — Front-End completo                | ⏳ Pendiente   |
| 6. Vista en navegador y conclusión Front-End          | ⏳ Pendiente   |
| 7. Planificación Back-End                             | ⏳ Pendiente   |

---

## Autor

**Emiliano** — Estudiante de Ingeniería en Informática, especialización en Ciberseguridad.  
_Proyecto académico y de portafolio — 2025/2026_
