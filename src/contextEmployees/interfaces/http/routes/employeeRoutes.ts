//importar el router de Express
import { Router } from "express";

// import { InMemoryUserRepo } from "infrastructure/repositories/inMemoryUserRepo";


import { CreateEmployee } from "@employees/application/use-cases/CreateEmployee"; 
import { DeleteEmployee } from "@employees/application/use-cases/DeleteEmployee";
import { GetEmployee } from "@employees/application/use-cases/GetEmployee";
import { GetAllEmployees } from "@employees/application/use-cases/GetAllEmployees";
import { UpdateEmployee } from "@employees/application/use-cases/UpdateEmployee";
import { FindByFilter } from "@employees/application/use-cases/FindByFilter";
import { GetPaginatedEmployee } from "@employees/application/use-cases/GetPaginatedEmployee";

import { EmployeeController } from "../controlers/EmployeeController"; 
import { PrismaEmployeeRepo } from "@employees/infrastructure/repositories/prismaEmployeeRepo"; 

import { authMiddleware } from "auth/infrastructure/middlewares/authMiddleware";
import { authorizeRoles } from "auth/infrastructure/authorizedRoles";
import { UserRole } from "auth/domain/UserRole";

const router = Router();

//implementeamos los user controller e inmemoryRepo, este inmemory lo podemos cambiar luego por el repo de prisma o la db que usemos, gracias a la arquitectura hexagonal SOLO TENEMOS QUE CAMBIARLOS EN ESTA LINEA Y TODO EL PROYECTO ACTUA CON EL NUEVO REPOSITORIO
const repo = new PrismaEmployeeRepo();
const controller = new EmployeeController(
  new CreateEmployee(repo),
  new DeleteEmployee(repo),
  new GetAllEmployees(repo),
  new GetEmployee(repo),
  new UpdateEmployee(repo),
  new FindByFilter(repo),
  new GetPaginatedEmployee(repo),
);

router.use(authMiddleware);
//LOS AUTHORIZEDROLES SON EL MIDDLEWARE DE VERIFICACIÓN DE LA OTRA APP
//tienen que ir los casos de get de más específico a más general, porque si no como tengas el general arriba la query entra al primero que pille y le coincida y ya cagaste
router.get('/paginated',authorizeRoles([UserRole.ADMIN, UserRole.USER]), controller.pagination);
router.get("/filter", authorizeRoles([UserRole.ADMIN,UserRole.USER]),controller.filter);
router.get("/:id", authorizeRoles([UserRole.ADMIN, UserRole.USER]),controller.get);
router.get("/", authorizeRoles([UserRole.ADMIN, UserRole.USER]),controller.getAll);

router.post("/", authorizeRoles([UserRole.ADMIN]),controller.create);

router.put("/:id", authorizeRoles([UserRole.ADMIN]),controller.update);

router.delete("/:id", authorizeRoles([UserRole.ADMIN]),controller.delete);

//LO EXPORTAS PARA USARLO EN EL INDEX
export { router };
