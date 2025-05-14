
// test de la integracion, no del caso de uso, probamos si funciona correctamente crear el user desde un post 
import express from 'express';
import request from 'supertest';

//importas el router
import  { router } from 'interfaces/http/routes/employeeRoutes';

const app = express();
app.use(express.json());
app.use('/employee',router)

describe('User routes', ()=>{
    it('POST /employee should create a user', async()=>{
        const res = await request(app).post('/employee').send({name: "Manolo", lastName: "Manolez"})

        //te faltan 6 exptecs
        expect(res.status).toBe(201);
        expect(res.body.name).toBe('Manolo');
    });
    //OTRO TEST, aqui se hace en el mismo archivo, en los casos de uso haces un archivo por cada test
    it('GET /employee should get all employees ', async()=>{
        const res = await request(app).get('/employee').send
    })
})
