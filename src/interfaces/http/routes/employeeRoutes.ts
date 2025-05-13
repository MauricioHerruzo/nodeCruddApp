//importar el router de Express
import {Router} from 'express'

import { InMemoryUserRepo } from 'infrastructure/repositories/inMemoryUserRepo';

import { CreateEmployee } from 'application/use-cases/CreateEmployee';
import { DeleteEmployee } from 'application/use-cases/DeleteEmployee';
import { GetEmployee } from 'application/use-cases/GetEmployee';
import { GetAllEmployees } from 'application/use-cases/GetAllEmployees';
import { UpdateEmployee } from 'application/use-cases/UpdateEmployee';

import {EmployeeController} from '../controlers/EmployeeController';
const router = Router();

//implementeamos los user controller e inmemoryRepo
const repo = new InMemoryUserRepo();
const controller = new EmployeeController(
    new CreateEmployee(repo),
    new DeleteEmployee(repo),
    new GetAllEmployees(repo),
    new GetEmployee(repo),
    new UpdateEmployee(repo),
);

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete); 

//LO EXPORTAS PARA USARLO EN EL INDEX
export {router}