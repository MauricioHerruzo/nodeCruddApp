
# 🧩 Node CRUD App - Arquitectura Hexagonal

Una aplicación CRUD desarrollada en **Node.js** y **TypeScript**, estructurada bajo el enfoque de **arquitectura hexagonal (Ports and Adapters)**. Esta arquitectura permite mantener una clara separación entre el dominio de negocio y los detalles de infraestructura.

---

## 📦 Dependencias

**Producción:**

- `express`: framework HTTP.
- `uuid`: generación de identificadores únicos.

**Desarrollo:**

- `typescript`, `ts-node`, `tsconfig-paths`
- `nodemon`: reinicio automático en desarrollo.
- `vitest`, `supertest`: pruebas unitarias e integración.
- `eslint`, `prettier`, `husky`: calidad de código y hooks.

---

## 📁 Estructura del Proyecto

```plaintext
src/
├── application/
│   └── use-cases/           # Casos de uso del dominio
├── domain/
│   ├── models/              # Entidades del dominio
│   └── repositories/        # Interfaces de persistencia
├── infrastructure/
│   └── repositories/        # Adaptadores concretos (ej: in-memory)
├── interfaces/
│   └── http/
│       ├── controllers/     # Controladores HTTP
│       └── routes/          # Definición de rutas
├── tests/
│   ├── integration/
│   └── unit/
└── index.ts                 # Entry point de la app
```

---

## 🚀 Scripts Disponibles

```bash
npm run dev        # Ejecuta el servidor con nodemon + ts-node
npm run test       # Ejecuta pruebas con Vitest
npm run eslint     # Lint del código
npm run prettier   # Formatea el código
```

---

## ✅ Buenas Prácticas Aplicadas

- Arquitectura Hexagonal: separación clara entre dominio, aplicación e infraestructura.
- Tests unitarios y de integración.
- Linting y formato automático.
- Repositorio en memoria para pruebas locales.

---

## 🧑‍💻 Autor: Mauricio Herruzo

Este proyecto fue desarrollado con fines educativos y puede ser extendido para producción.