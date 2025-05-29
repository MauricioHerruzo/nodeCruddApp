//Importar el framwork de express
import express from "express";
import swaggerUI from 'swagger-ui-express';
import {swaggerSpec} from '../swaggerConfig';

//importas el router hecho
import { router } from "@employees/interfaces/http/routes/employeeRoutes";  
import { routerJobs } from "@jobs/interfaces/http/routes/jobRoutes"; 

//ejecutarlo , esto devuelve el objeto app, que es lo que vamos a usar para todo
const app = express();

//puerto para por si acaso
const port = process.env.PORT ?? "9001";

//usas info de express que necesitas ESTO ES MIDDLEWARE
app.use(express.json());

//usas el router que has importado y que tienes hecho aparte
app.use("/api/employees", router);
//documentación de swagger
app.use('/api-docs', swaggerUI.server, swaggerUI.setup(swaggerSpec));

app.use("/api/jobs", routerJobs)

//Listen
app.listen(port, () => {
  console.log(`Escuchando el puerto ${port}`);
});
