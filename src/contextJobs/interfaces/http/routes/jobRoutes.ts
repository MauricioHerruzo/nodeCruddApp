//importar el router de Express
import { Router } from "express";

// import { InMemoryUserRepo } from "infrastructure/repositories/inMemoryUserRepo";


import { CreateJob } from "contextJobs/application/use-cases/CreateJob"; 
import { DeleteJob } from "contextJobs/application/use-cases/DeleteJob";
import { FindJobByFilter } from "contextJobs/application/use-cases/FindByFilter";
import { GetAllJobs } from "contextJobs/application/use-cases/GetAllJobs";
import { GetJob } from "contextJobs/application/use-cases/GetJob";


import { JobController } from "../controlers/JobController"; 
import { PrismaJobRepo } from "contextJobs/infrastructure/repositories/prismaJobRepo"; 
const routerJobs = Router();

//implementeamos los user controller e inmemoryRepo, este inmemory lo podemos cambiar luego por el repo de prisma o la db que usemos, gracias a la arquitectura hexagonal SOLO TENEMOS QUE CAMBIARLOS EN ESTA LINEA Y TODO EL PROYECTO ACTUA CON EL NUEVO REPOSITORIO
const repo = new PrismaJobRepo();
const controller = new JobController(
  new CreateJob(repo),
  new DeleteJob(repo),
  new GetAllJobs(repo),
  new GetJob(repo),
  new FindJobByFilter(repo)
);

//tienen que ir los casos de get de más específico a más general, porque si no como tengas el general arriba la query entra al primero que pille y le coincida y ya cagaste
routerJobs.get("/filter", controller.filter);
routerJobs.get("/:id", controller.get);
routerJobs.get("/", controller.getAll);

routerJobs.post("/", controller.create);

// router.put("/:id", controller.update);

routerJobs.delete("/:id", controller.delete);

//LO EXPORTAS PARA USARLO EN EL INDEX
export { routerJobs };
