# Segundo Avance — Arquitectura Backend de =Formula()

> Justificación y sustento técnico del stack de Backend seleccionado para la plataforma interactiva de aprendizaje de Excel.

---

## Tabla de contenido

1. [Stack tecnológico elegido](#1-stack-tecnológico-elegido)
2. [Elementos necesarios para el Backend](#2-elementos-necesarios-para-el-backend)
   - [2a. Base de Datos](#2a-base-de-datos)
   - [2b. Seguridad](#2b-seguridad)
   - [2c. APIs REST, controladores y CRUD](#2c-apis-rest-controladores-y-crud)
   - [2d. Autenticación](#2d-autenticación)
   - [2e. Otros](#2e-otros)
3. [Relación con la estructura actual del proyecto](#3-relación-con-la-estructura-actual-del-proyecto)

---

## 1. Stack tecnológico elegido

```
=Formula() — Backend Stack
├── Runtime:     Node.js v20 LTS
├── Framework:   Express.js v4
├── ORM:         Prisma
├── Base datos:  PostgreSQL 16
├── Auth:        JWT (jsonwebtoken) + bcrypt
└── Variables:   dotenv
```

### ¿Por qué este stack y no otro?

El criterio de selección partió de tres restricciones reales del proyecto:

| Criterio                                                                              | Decisión                                                                                                                     |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| El Frontend ya está en JavaScript vanilla                                             | El Backend debe compartir el mismo lenguaje → **Node.js**                                                                    |
| La plataforma requiere relaciones complejas (usuarios ↔ progreso ↔ lecciones ↔ retos) | Se necesita una base de datos **relacional** → **PostgreSQL**                                                                |
| El equipo no tiene experiencia en Java o Go                                           | El stack debe ser de **curva de aprendizaje baja** dentro del ecosistema JS para el progreso efectivo y entrega del proyecto |

#### Node.js como runtime

Node.js permite ejecutar JavaScript en el servidor. Esto es relevante para =Formula() por dos razones concretas:

- **Continuidad de lenguaje**: el `main.js` y `views/challenges.js` puede construir los controladores del backend sin cambiar de contexto.
- **Ecosistema npm**: acceso inmediato a paquetes como `jsonwebtoken`, `bcrypt`, `prisma` y `express`, todos ampliamente mantenidos y documentados.

#### Express.js como framework HTTP

Express es el framework minimalista más utilizado sobre Node.js. No impone una estructura rígida, lo que permite diseñar la arquitectura REST a medida del proyecto.  
¿Por qué no Fastify, Hono o NestJS?

- Express tiene mayor adopción y documentación.
- NestJS agrega abstracción innecesaria para un MVP.
- El objetivo es entender la capa HTTP desde su base.

#### Prisma como ORM

Prisma traduce operaciones de base de datos a código JavaScript tipado. En lugar de escribir SQL crudo, se define un `schema.prisma` que actúa como fuente para el modelo de datos.

```prisma
// Ejemplo de modelo para =Formula()
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  progress  Progress[]
}

model Lesson {
  id         Int      @id @default(autoincrement())
  title      String
  level      Level
  content    String
  challenges Challenge[]
}

enum Level {
  BEGINNER
  INTERMEDIATE
  ADVANCED
  EXPERT
}
```

**Justificación sobre alternativas:**

| ORM / enfoque | Razón de descarte                                        |
| ------------- | -------------------------------------------------------- |
| SQL crudo     | Mayor probabilidad de errores y sin tipado               |
| Sequelize     | API menos intuitiva, migración manual más compleja       |
| TypeORM       | Requiere TypeScript como prerequisito                    |
| **Prisma**    | Schema declarativo, migraciones automáticas, DX superior |

---

## 2. Elementos necesarios para el Backend

### 2a. Base de Datos

**Motor seleccionado: PostgreSQL 16**

PostgreSQL es un sistema de gestión de bases de datos relacional (RDBMS) de código abierto. Para =Formula(), la elección de un modelo **relacional** (y no documental como MongoDB) responde directamente a la naturaleza de los datos:

- Un usuario tiene → múltiples registros de progreso
- Un registro de progreso referencia → una lección O un reto
- Una lección pertenece → a un nivel y una categoría
- Un reto tiene → una dificultad, un puntaje máximo y un resultado por usuario

Estas relaciones **muchos a muchos** y **uno a muchos** se modelan de forma natural y eficiente en un esquema relacional. MongoDB, al ser documental, obligaría a duplicar datos o a manejar referencias manualmente, perdiendo las garantías de integridad que ofrece PostgreSQL.

**Diagrama de entidades principal (ERD simplificado):**

```
┌──────────┐       ┌──────────┐       ┌───────────┐
│  users   │──────<│ progress │>──────│  lessons  │
├──────────┤       ├──────────┤       ├───────────┤
│ id       │       │ id       │       │ id        │
│ email    │       │ userId   │       │ title     │
│ password │       │ lessonId │       │ level     │
│ name     │       │ score    │       │ content   │
└──────────┘       │ completed│       └───────────┘
                   └──────────┘
                        │
                   ┌────┘
                   │
             ┌───────────┐
             │ challenges│
             ├───────────┤
             │ id        │
             │ title     │
             │ difficulty│
             │ maxScore  │
             └───────────┘
```

**¿Por qué no MongoDB?**

MongoDB es una excelente opción para datos no estructurados o con esquemas variables (catálogos, logs, contenido CMS). Los datos de =Formula() son altamente estructurados y relacionales: un usuario siempre tiene `id`, `email` y `password`; una lección siempre tiene `título`, `nivel` y `contenido`. No hay variabilidad de esquema que justifique un modelo documental.

---

### 2b. Seguridad

La seguridad del backend de =Formula() se aborda en tres capas:

#### i. Hashing de contraseñas con `bcrypt`

Las contraseñas **nunca se almacenan en texto plano**. Se utiliza `bcrypt` para generar un _hash salted_ antes de persistir en la base de datos.

```js
// Al registrar un usuario
const saltRounds = 12;
const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
```

```js
// Al verificar login
const isValid = await bcrypt.compare(plainPassword, storedHash);
```

El factor de costo (`saltRounds = 12`) hace que el hash sea computacionalmente costoso de invertir por fuerza bruta.

#### ii. Variables de entorno con `dotenv`

Ningún secreto (clave JWT, credenciales de base de datos, puerto) se escribe directamente en el código. Se gestionan mediante un archivo `.env` que **nunca se sube al repositorio** (incluido en `.gitignore`).

#### iii. Validación de entrada

Toda entrada del cliente se valida antes de procesarse. Se utilizará `express-validator` o validación manual en los controladores para prevenir inyecciones y datos malformados.

---

### 2c. APIs REST, controladores y CRUD

El backend de =Formula() expone una **API REST** que el frontend consume mediante `fetch()`. Cada recurso del dominio (usuarios, lecciones, retos, progreso) tiene su propio conjunto de rutas y un controlador asociado.

#### Estructura de rutas prevista

```
POST   /api/auth/register      → Registrar usuario
POST   /api/auth/login         → Iniciar sesión → devuelve JWT

GET    /api/lessons             → Listar todas las lecciones
GET    /api/lessons/:id         → Obtener lección por ID
GET    /api/lessons/level/:lvl  → Filtrar por nivel

GET    /api/challenges          → Listar todos los retos
GET    /api/challenges/:id      → Obtener reto por ID
POST   /api/challenges/:id/submit → Enviar respuesta y obtener puntaje

GET    /api/progress            → Progreso del usuario autenticado
PATCH  /api/progress/:lessonId  → Marcar lección como completada
```

#### Ejemplo de controlador (CRUD)

```js
// controllers/lessonController.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// READ — Obtener todas las lecciones
const getLessons = async (req, res) => {
  try {
    const lessons = await prisma.lesson.findMany({
      orderBy: { level: "asc" },
    });
    res.json({ success: true, data: lessons });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al obtener lecciones" });
  }
};

// READ — Obtener lección por ID
const getLessonById = async (req, res) => {
  const { id } = req.params;
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id: Number(id) },
    });
    if (!lesson)
      return res.status(404).json({ message: "Lección no encontrada" });
    res.json({ success: true, data: lesson });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error interno" });
  }
};

module.exports = { getLessons, getLessonById };
```

**Principio aplicado:** cada controlador tiene una sola responsabilidad (SRP). Las rutas solo enrutan; la lógica vive en los controladores; el acceso a datos pasa exclusivamente por Prisma.

---

### 2d. Autenticación

**Mecanismo: JWT (JSON Web Tokens)**

El flujo de autenticación de =Formula() es **stateless**: el servidor no guarda sesiones. En su lugar, emite un token firmado que el cliente almacena y envía en cada petición protegida.

#### Flujo completo

1. Cliente → `POST /api/auth/login { email, password }`
2. Servidor → `Verifica credenciales con bcrypt.compare()`
3. Servidor → Firma un JWT con el `userId` y lo devuelve
4. Cliente → Guarda el token (`localStorage` o cookie `httpOnly`)
5. Cliente → En cada petición protegida: Authorization: `Bearer <token>`
6. Servidor → Middleware verifica y decodifica el token
7. Servidor → Si válido: procesa la petición; si inválido: `401` Unauthorized

#### Implementación del middleware de autenticación

```js
// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No autorizado — token requerido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

module.exports = { protect };
```

```js
// Uso en una ruta protegida
const { protect } = require("../middlewares/authMiddleware");
router.get("/progress", protect, getProgress);
```

**¿Por qué JWT y no sesiones con express-session?**

| Criterio                           | JWT | Sessions                 |
| ---------------------------------- | --- | ------------------------ |
| Stateless (sin estado en servidor) | Sí  | No                       |
| Escalable a múltiples instancias   | Sí  | Sí pero requiere Redis   |
| Compatible con SPA y APIs          | Sí  | Sí pero requiere cookies |
| Simplicidad para un MVP            | Sí  | Sí                       |

Para un MVP de plataforma SPA que consume una API REST, JWT es la elección natural. Cuando el frontend hace `fetch('/api/lessons')`, no hay un formulario HTML con sesión de por medio; hay una petición HTTP que necesita un token portador.

---

### 2e. Otros

#### CORS — Cross-Origin Resource Sharing

El frontend (servido desde un origen) y el backend (corriendo en otro puerto) son orígenes distintos. Sin configurar CORS, el navegador bloqueará todas las peticiones del frontend a la API.

```js
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5500", // origen del Live Server del frontend
    methods: ["GET", "POST", "PATCH", "DELETE"],
  }),
);
```

#### Estructura de carpetas del Backend

La estructura separa claramente las responsabilidades y es compatible con la estructura modular que ya tiene el frontend:

```
backend/
├── prisma/
│   ├── schema.prisma        ← Definición del modelo de datos
│   └── migrations/          ← Historial de migraciones
├── src/
│   ├── controllers/         ← Lógica de negocio por recurso
│   │   ├── authController.js
│   │   ├── lessonController.js
│   │   ├── challengeController.js
│   │   └── progressController.js
│   ├── middlewares/
│   │   └── authMiddleware.js ← Verificación de JWT
│   ├── routes/              ← Definición de endpoints
│   │   ├── authRoutes.js
│   │   ├── lessonRoutes.js
│   │   ├── challengeRoutes.js
│   │   └── progressRoutes.js
│   └── app.js               ← Configuración de Express + middlewares
├── .env                     ← Variables de entorno (en .gitignore)
├── .env.example             ← Plantilla pública de variables
├── .gitignore
├── package.json
└── server.js                ← Entry point — levanta el servidor
```

#### Paquetes y su función

| Paquete          | Versión    | Función                           |
| ---------------- | ---------- | --------------------------------- |
| `express`        | ^4.18      | Framework HTTP                    |
| `@prisma/client` | ^5.0       | Cliente ORM generado              |
| `prisma`         | ^5.0       | CLI para migraciones y schema     |
| `jsonwebtoken`   | ^9.0       | Firma y verificación de JWT       |
| `bcrypt`         | ^5.1       | Hashing de contraseñas            |
| `dotenv`         | ^16.0      | Carga de variables de entorno     |
| `cors`           | ^2.8       | Política de origen cruzado        |
| `nodemon`        | ^3.0 (dev) | Reinicio automático en desarrollo |

---

## 3. Relación con la estructura actual del proyecto

La estructura del frontend ya refleja una separación clara entre **vistas** y **componentes**, lo que facilita la integración con el backend sin refactorizaciones mayores:

```
js/
├── components/
│   ├── card.js        → Los cards de lecciones/retos consumirán GET /api/lessons
│   ├── navbar.js      → Detectará si hay JWT en storage para mostrar avatar/logout
│   └── footer.js
└── views/
    ├── curriculum.js  → Fetch a GET /api/lessons y GET /api/progress
    ├── challenges.js  → Fetch a GET /api/challenges
    └── dashboard.js   → Fetch a GET /api/progress (datos del usuario autenticado)
```

Cada vista del frontend tiene un endpoint de backend correspondiente. La integración será progresiva: primero se construirán los endpoints de lectura (GET), luego los de autenticación, y finalmente los de escritura de progreso (POST/PATCH).

---

> **Stack final:**
> `Node.js` + `Express` + `Prisma` + `PostgreSQL` + `JWT` + `bcrypt`
>
> Una API REST stateless, con modelo de datos relacional, autenticación por tokens y hashing de contraseñas — el backend mínimo y suficiente para sostener una plataforma de aprendizaje interactivo en su fase MVP.
