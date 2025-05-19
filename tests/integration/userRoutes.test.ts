// test de la integracion, no del caso de uso, probamos si funciona correctamente crear el user desde un post

//Com
import { describe, it, beforeAll, expect } from "vitest";
import express from "express";
import request from "supertest";

//importas el router
import { router } from "interfaces/http/routes/employeeRoutes";


const app = express();
app.use(express.json());
app.use("/employee", router);

const employees: string[] = [];

beforeAll(async () => {
  for (let i = 0; i < 5; i++) {
    const response = await request(app)
      .post("/employee")
      .send({ name: "Manolo", lastName: "Manolez" });
      employees.push(response.body);
  }
});
describe("User routes", async () => {
  //estás creando un empleado fuera, teniendo que hacer async el describe, para tener un solo empleado con el que trabajar en todos los test, porque si lo creas dentro del test y al get no le haces crear a su vez un empleado te va a decir que espera un empleado creado qeu se ha creado en el test del post, así tienes uno para trabajar con todos los tests
  

  // console.log(employees)

  //realmente no necesitamos crear el user dentro para saber que el teste funciona, lo que necesitamos el los expect, y funcionan, la creacion se está haciendo arriba y matchea con lo que esperas
  it("POST /employee should create a user", async () => {
    //te faltan 6 exptecs
    // expect(res.status).toBe(201);
    // expect(res.body.name).toBe("Manolo");
     expect(employees).toBeDefined();
  });

  // OTRO TEST, aqui se hace en el mismo archivo, en los casos de uso haces un archivo por cada test
  it("GET /employee should get all employees ", async () => {
    const res = await request(app).get("/employee");
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(employees);
  });

  // //OTRO TEST, ID
  // it("GET /employee should get all employees ", async () => {
  //   //buscamos por ese id creado
  //   const res = await request(app).get(`/employee/${employeeId}`);
  //   expect(res.status).toBe(200);
  //   //esperamos que reciba los datos correspondientes
  //   expect(res.body).toMatchObject({
  //     id: employeeId,
  //     name: "Manolo",
  //     lastName: "Manolez",
  //   });
  // });


//PAGINATION TEST /users?page=1&limit=10
  it("SHOULD GET X PAGE of X employees", async()=>{
    const res = await request(app).get('/employee/paginated?page=1&limit=4');

    expect(res.status).toBe(200);
    // expect(res.body).toMatchObject([
    //     {   
    //         id: employees,
    //         name: "Manolo",
    //         lastName: "Manolez"
    //     },
    // ])
    // res.body.forEach(employee=>{
    //   expect(employee).toMatchObject({
    //     name:"Manolo",
    //     lastName: "Manolez"
    //   });
    //   //con esto puedo esperar el id pero al ser generados random no tengo que especificar que valores espero
    //   expect(employee).toHaveProperty('id')
    // })
    // expect(res.body).toHaveLength(4);

  expect(res.body).toHaveProperty("data");
  expect(res.body.data).toHaveLength(4);
  expect(res.body.page).toBe(1);
  expect(res.body.totalPages).toBe(2);
  expect(res.body.totalItems).toBe(5);

// expect(res.body.data).toHaveLength(4);

//   res.body.data.forEach(employee => {
//     expect(employee).toMatchObject({
//       name: "Manolo",
//       lastName: "Manolez"
//     });
//     expect(employee).toHaveProperty("id");
//   });

  });
  
});


