
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

## 🧠 Dominio

```ts
// src/domain/models/Employee.ts
export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
}
```

```ts
// src/domain/repositories/EmployeeRepository.ts
import { Employee } from "../models/Employee";

export interface EmployeeRepository {
  create(employee: Employee): Promise<Employee>;
  delete(id: string): Promise<void>;
  update(id: string, data: Partial<Employee>): Promise<Employee>;
  getAll(): Promise<Employee[]>;
  getById(id: string): Promise<Employee | null>;
  findByFilter(filter: Partial<Employee>): Promise<Employee[]>;
}
```

---

## ⚙️ Casos de Uso

```ts
// src/application/use-cases/CreateEmployee.ts
import { EmployeeRepository } from "../../domain/repositories/EmployeeRepository";

export const CreateEmployee = (repo: EmployeeRepository) => async (data: any) => {
  return repo.create(data);
};
```

```ts
// src/application/use-cases/GetAllEmployees.ts
export const GetAllEmployees = (repo: EmployeeRepository) => async () => {
  return repo.getAll();
};
```

---

## 🧱 Infraestructura

```ts
// src/infrastructure/repositories/inMemoryUserRepo.ts
import { EmployeeRepository } from "../../domain/repositories/EmployeeRepository";
import { Employee } from "../../domain/models/Employee";
import { v4 as uuidv4 } from "uuid";

export const InMemoryUserRepo = (): EmployeeRepository => {
  const db: Employee[] = [];

  return {
    async create(employee) {
      const newEmp = { ...employee, id: uuidv4() };
      db.push(newEmp);
      return newEmp;
    },
    async delete(id) {
      const index = db.findIndex(e => e.id === id);
      if (index >= 0) db.splice(index, 1);
    },
    async update(id, data) {
      const emp = db.find(e => e.id === id);
      if (!emp) throw new Error("Not found");
      Object.assign(emp, data);
      return emp;
    },
    async getAll() {
      return db;
    },
    async getById(id) {
      return db.find(e => e.id === id) || null;
    },
    async findByFilter(filter) {
      return db.filter(e =>
        Object.entries(filter).every(([k, v]) => e[k as keyof Employee] === v)
      );
    },
  };
};
```

---

## 🌐 Interfaces HTTP

### Controlador

```ts
// src/interfaces/http/controllers/EmployeeController.ts
import { Request, Response } from "express";

export const EmployeeController = (useCases: any) => ({
  create: async (req: Request, res: Response) => {
    const emp = await useCases.create(req.body);
    res.status(201).json(emp);
  },
  getAll: async (_req: Request, res: Response) => {
    const employees = await useCases.getAll();
    res.json(employees);
  },
});
```

### Rutas

```ts
// src/interfaces/http/routes/employeeRoutes.ts
import { Router } from "express";

export const employeeRoutes = (controller: any) => {
  const router = Router();
  router.post("/", controller.create);
  router.get("/", controller.getAll);
  return router;
};
```

---

## 🧪 Pruebas

```ts
// src/tests/unit/CreateEmployee.test.ts
import { describe, it, expect } from "vitest";
import { InMemoryUserRepo } from "../../../src/infrastructure/repositories/inMemoryUserRepo";
import { CreateEmployee } from "../../../src/application/use-cases/CreateEmployee";

describe("CreateEmployee", () => {
  it("should create an employee", async () => {
    const repo = InMemoryUserRepo();
    const useCase = CreateEmployee(repo);
    const emp = await useCase({ name: "John", position: "Dev", department: "IT" });

    expect(emp).toHaveProperty("id");
    expect(emp.name).toBe("John");
  });
});
```

---

## 🏁 Punto de Entrada

```ts
// src/index.ts
import express from "express";
import { InMemoryUserRepo } from "./infrastructure/repositories/inMemoryUserRepo";
import { employeeRoutes } from "./interfaces/http/routes/employeeRoutes";
import { EmployeeController } from "./interfaces/http/controllers/EmployeeController";
import { CreateEmployee } from "./application/use-cases/CreateEmployee";
import { GetAllEmployees } from "./application/use-cases/GetAllEmployees";

const app = express();
app.use(express.json());

const repo = InMemoryUserRepo();
const useCases = {
  create: CreateEmployee(repo),
  getAll: GetAllEmployees(repo),
};

app.use("/employees", employeeRoutes(EmployeeController(useCases)));

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
```

---

## ✅ Buenas Prácticas Aplicadas

- Arquitectura Hexagonal: separación clara entre dominio, aplicación e infraestructura.
- Tests unitarios y de integración.
- Linting y formato automático.
- Repositorio en memoria para pruebas locales.

---

## 📌 TODOs

- [ ] Agregar base de datos real (PostgreSQL/MongoDB).
- [ ] Manejo de errores más robusto.
- [ ] Validaciones con Zod o Joi.
- [ ] Autenticación y autorización.

---

## 🧑‍💻 Autor: Mauricio Herruzo

Este proyecto fue desarrollado con fines educativos y puede ser extendido para producción.