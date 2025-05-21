// test de la integracion, no del caso de uso, probamos si funciona correctamente crear el user desde un post

//Com
import { describe, it, beforeAll, expect } from "vitest";
import express from "express";
import request from "supertest";

//importas el router
import { router } from "interfaces/http/routes/employeeRoutes";
import { Employee } from "domain/models/Employee";


const app = express();
app.use(express.json());
app.use("/employee", router);

const employees: Employee[] = [];

beforeAll(async () => {
  for (let i = 0; i < 5; i++) {
    const response = await request(app)
      .post("/employee")
      .send(new Employee( null, "Manolo", "Manolez", "junior", 2000, "27-8-2026", "team4", 2 ));

    //Hay que deconstruir la response para poder guardar en el array los objetos como instancias de Employee, para poder acceder a getId() más abajo
    const { id, name, lastName, position, salary, contractTermination, team, yearsOfService } = response.body;
    const employee = new Employee(id, name, lastName, position, salary, contractTermination, team,yearsOfService);
    employees.push(employee); 
    // console.log(employees);
  }
});

describe("User routes",  () => {
  //estás creando un empleado fuera, teniendo que hacer async el describe, para tener un solo empleado con el que trabajar en todos los test, porque si lo creas dentro del test y al get no le haces crear a su vez un empleado te va a decir que espera un empleado creado qeu se ha creado en el test del post, así tienes uno para trabajar con todos los tests
  
  //realmente no necesitamos crear el user dentro para saber que el teste funciona, lo que necesitamos el los expect, y funcionan, la creacion se está haciendo arriba y matchea con lo que esperas
  it("POST /employee should create a user", async () => {
    const employee6 = {
      name: "Manolo",
      lastName:"Manolez"
    }
    
    const res = await request(app).post("/employee").send(employee6)
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(employee6.name);
    //para salvar el test GETALL
    employees.push(res.body);
  });

  // OTRO TEST, aqui se hace en el mismo archivo, en los casos de uso haces un archivo por cada test
  it("GET /employee should get all employees ", async () => {
    const res = await request(app).get("/employee");

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(employees);
  });

  //OTRO TEST, ID
  it("GET /employee should an employee by ID ", async () => {
    //buscamos por ese id creado
    const res = await request(app).get(`/employee/`+ employees[0].getId());

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: employees[0].getId(),
      name: "Manolo",
      lastName: "Manolez",
    });
  });

  //PAGINATION TEST /users?page=1&limit=10
  it("SHOULD GET X PAGE of X employees", async () => {
    const res = await request(app).get('/employee/paginated?page=1&limit=4');

    expect(res.status).toBe(200);
    // expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveLength(4);
    expect(res.body.page).toBe(1);
    expect(res.body.totalPages).toBe(2);
    // expect(res.body.totalItems).toBe(6);
  });
});
