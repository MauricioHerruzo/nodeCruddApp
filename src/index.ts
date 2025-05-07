//Importar el framwork de express
import express from 'express';

//ejecutarlo , esto devuelve el objeto app, que es lo que vamos a usar para todo
const app = express();


//puerto para por si acaso
const port = process.env.PORT ?? "9001";

app.listen(port, () => {
    console.log(`Escuchando el puerto ${port}`);
});