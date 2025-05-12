//Importar el framwork de express
import express from 'express';

//importas el router hecho
import {router} from './interfaces/http/routes/userRoutes'

//ejecutarlo , esto devuelve el objeto app, que es lo que vamos a usar para todo
const app = express();


//puerto para por si acaso
const port = process.env.PORT ?? "9001";

//Listen
app.listen(port, () => {
    console.log(`Escuchando el puerto ${port}`);
});

//usas info de express que necesitas
app.use(express.json());
//usas el router que has importado y que tienes hecho aparte
app.use('/users', router)





