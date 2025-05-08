//Importar el framwork de express
import express from 'express';

//ejecutarlo , esto devuelve el objeto app, que es lo que vamos a usar para todo
const app = express();


//puerto para por si acaso
const port = process.env.PORT ?? "9001";

//Listen
app.listen(port, () => {
    console.log(`Escuchando el puerto ${port}`);
});

// ❌El puerto no se me actualiza sobre los cambios, tengo que reiniciarlo
// ❌ no entiendo lo que tengo que sacar en el get
//GET ALL
app.get('/', (req, res)=>{
    res.send('<h1>Hola</h1>')
    // res.send(getUsers());
})

//GET NAME
app.get('/users',(req,res)=>{
    // res.
})

//POST
app.post('/users',(req, res)=>{
    
})

//PUT
app.put('/users',(req, res)=>{
    
})

//DELETE
app.delete('/users', (req, res) =>{
    
})





