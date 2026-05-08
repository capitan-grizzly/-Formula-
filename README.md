# 🚀 =Formula()

> _Domina Excel del mismo modo que los desarrolladores aprenden a programar._

=Formula() es una metodología (o herramienta) diseñada para romper la barrera entre "conocer la fórmula" y "resolver el problema". Transformamos el aprendizaje pasivo en una experiencia de diseño lógico y estructurado.

---

## Tabla de contenido

1. [¿Por qué =Formula() y para quién es?](#1-¿por-que-formula-y-para-quien-es?)
2. [Objetivo del Desarrollo](#2-objetivo-del-desarrollo)
3. [Estructura de =Formula()](#3-estructura-de-formula)

---

### 1.1 Nombre del Proyecto

**=Formula()** — una plataforma interactiva de aprendizaje de Excel estructurada en lecciones progresivas y retos técnicos clasificados por dificultad, inspirada en el enfoque y la experiencia de usuario de plataformas como LeetCode, SQLBolt y Learn Git Branching.

### 1.2 Contexto y problemática

Excel es, a día de hoy, una de las herramientas más demandadas en entornos laborales y académicos: finanzas, análisis de datos, administración, logística, contabilidad, y prácticamente cualquier área que trabaje con información estructurada. Sin embargo, la curva de aprendizaje real de Excel —es decir, pasar de usuario básico a usuario competente— está fragmentada y mal resuelta por los recursos actuales.

Los problemas concretos que se identifican son:

| #   | Problema                              | Descripción                                                                                                                                                                                   |
| --- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Recursos pasivos**                  | La mayoría de plataformas (YouTube, Udemy, Coursera) ofrecen video-tutoriales donde el usuario observa pero no practica dentro del mismo entorno. El aprendizaje no se consolida.             |
| 2   | **Falta de progresión estructurada**  | Los cursos saltan de básico a avanzado sin una ruta clara. No existe un sistema de niveles comparable al que usan plataformas de programación.                                                |
| 3   | **Ausencia de contexto profesional**  | Los ejercicios son artificiales ("escribe la suma de A1:A10"). No replican escenarios reales: análisis de ventas, reportes financieros, dashboards operativos.                                |
| 4   | **Sin entorno de práctica inmediata** | El usuario necesita abrir Excel por separado, replicar el enunciado, y luego volver al recurso. Esa fricción destruye el flujo de aprendizaje.                                                |
| 5   | **Experiencia de usuario anticuada**  | Plataformas como ExcelExercises.com resuelven parte del problema práctico, pero su diseño y UX no invitan al usuario técnico moderno. No comunican progreso, no gamifican, no generan hábito. |

### 1.3 ¿A quién afecta esta problemática?

- **Estudiantes universitarios** (administración, finanzas, ingeniería) que necesitan Excel como competencia profesional transversal.
- **Profesionales en transición** que quieren validar o reforzar sus habilidades para el mercado laboral.
- **Autodidactas del área tech** que ya aprenden con plataformas como LeetCode o freeCodeCamp y esperan la misma calidad de experiencia para otras herramientas.
- **Docentes y bootcamps** que necesitan un recurso con estructura clara para asignar práctica guiada.

### 1.4 ¿Qué resuelve =Formula()?

ExcelPath integra en una sola plataforma:

- **Teoría contextualizada**: cada concepto se explica con simulación visual del comportamiento dentro de una hoja de cálculo, sin necesidad de abrir Excel.
- **Práctica inmediata**: el usuario resuelve directamente en la plataforma; la corrección es automática.
- **Progresión de dificultad**: el contenido está estructurado en niveles (Beginner → Intermediate → Advanced → Expert), con un mapa de aprendizaje visible.
- **Retos con contexto real**: los challenges simulan situaciones profesionales reales (reportes de ventas, análisis financiero, limpieza de datos, dashboards).
- **UX moderna orientada al perfil técnico**: diseño oscuro, sintaxis resaltada, interfaz limpia, progreso visible —exactamente lo que un usuario de LeetCode o HTB esperaría.

---

## 2. Objetivo del Desarrollo

### 2.1 Objetivo general

Desarrollar una plataforma web interactiva que permita a cualquier persona aprender y dominar Microsoft Excel de forma progresiva, práctica y autodirigida, a través de lecciones estructuradas y retos técnicos con corrección automática, replicando la experiencia de usuario de las mejores plataformas de aprendizaje del ecosistema de desarrollo de software.

### 2.2 Objetivos específicos

#### Frontend

- Diseñar y desarrollar las pantallas principales de la plataforma: `Landing`, `Learn`, `Challenges`, `Lesson View` y `Challenge View`.
- Implementar un sistema de navegación claro y consistente con mapa de rutas definido.
- Establecer el sistema de diseño base: tipografía, paleta de colores, componentes reutilizables (cards, badges, sidebar, progress bar).
- Construir la interfaz del simulador de hoja de cálculo embebido en las vistas de lección y reto.
- Garantizar responsividad completa para escritorio, tablet y móvil.

#### Backend

- Diseñar e implementar la API REST que gestione lecciones, retos, usuarios y progreso.
- Construir el motor de validación automática de respuestas para los challenges.
- Implementar sistema de autenticación y perfil de usuario.

---

## 3. Estructura de =Formula()

### 3.1 Web App con arquitectura SPA

=Formula() se construirá como una **Single Page Application** con rendering del lado del cliente (CSR), utilizando **HTML + CSS + JavaScript vanilla** en esta fase de Front-End, con una arquitectura preparada para migrar a un framework (React / Next.js) en fases posteriores.

### 3.2 ¿Por qué SPA y no otro enfoque?

Se evaluaron tres alternativas antes de tomar la decisión:

| Tipo de sitio                     | Descripción                                                                                           | ¿Aplica para ExcelPath?                                                                                                                   |
| --------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Static Site (HTML/CSS puro)**   | Páginas estáticas sin interacción dinámica                                                            | ❌ Insuficiente — la plataforma requiere estado, interacción y actualización dinámica del DOM (simulador, validación de retos, progreso). |
| **Multi-Page Application (MPA)**  | Cada ruta es un documento HTML separado, el servidor responde con una página nueva en cada navegación | ⚠️ Posible, pero implica recargas completas que rompen la fluidez esperada en una herramienta de aprendizaje interactivo.                 |
| **Single Page Application (SPA)** | Una sola carga inicial; el routing y el renderizado son gestionados por JavaScript en el cliente      | ✅ Óptimo — permite navegación fluida, estado persistente entre vistas, y experiencia de app nativa en el navegador.                      |

### 3.3 Justificación por criterio

**a) Naturaleza interactiva del producto**

=Formula() no es un blog ni un sitio informativo. Es una herramienta que el usuario _usa activamente_: escribe fórmulas, recibe feedback inmediato, navega entre lecciones, ve su progreso actualizarse. Esta interacción continua requiere una arquitectura orientada al estado del cliente, no a la recarga de páginas.

**b) Experiencia de usuario sin interrupciones**

Las plataformas de referencia (LeetCode, SQLBolt, Learn Git Branching) son todas SPA. La razón es directa: cuando un usuario está en medio de un reto, cualquier recarga de página destruye el contexto y la concentración. La navegación debe ser instantánea.

**c) Simulador embebido**

El componente más crítico de =Formula() requiere mantener estado entre interacciones (celdas activas, valores ingresados, estado de validación). Esto es impracticable en una arquitectura de múltiples páginas sin JavaScript client-side robusto. Con SPA, el simulador es un componente vivo que persiste mientras el usuario trabaja.

**d) Escalabilidad hacia React / Next.js**

Al estructurar el código vanilla con separación de responsabilidades (componentes, router, state management), la migración a React en Fase 2 es incremental y no requiere reescritura total. La SPA en vanilla sirve como prototipo funcional y base arquitectónica real.

**e) SEO y accesibilidad (consideración futura)**

Una SPA pura tiene desventajas en SEO. Para las páginas de marketing (landing, sobre nosotros) se considera implementar pre-rendering o migrar a **Next.js con SSG/SSR** en fases posteriores, donde el contenido estático se sirve pre-renderizado y las vistas de aplicación siguen siendo dinámicas. En esta fase, el SEO no es prioritario frente a la funcionalidad.

### 3.4 Stack

```
=Formula()/
├── Frontend (A priori)
│   ├── HTML5 semántico
│   ├── CSS3 (Custom Properties, Flexbox, Grid, animaciones)
│   └── JavaScript ES6+ (módulos, routing SPA manual, DOM API)
│
└── (A posteriori)
    ├── React + Next.js
    ├── Node.js + Express / FastAPI
    └── PostgreSQL + Prisma ORM
```
