import { Response, Request } from "express"

// import all use cases 
import { CreateEmployee } from "application/use-cases/CreateEmployee";
import {DeleteEmployee} from "application/use-cases/DeleteEmployee";
import { GetAllEmployees } from "application/use-cases/GetAllEmployees";
import { GetEmployee } from "application/use-cases/GetEmployee";
import { UpdateEmployee } from "application/use-cases/UpdateEmployee";


export class EmployeeController {
    constructor(
        private readonly  createEmployee : CreateEmployee,
        private readonly  deleteEmployee : DeleteEmployee,
        private readonly getAllEmployees : GetAllEmployees,
        private readonly getEmployees : GetEmployee,
        private readonly UpdateEmployee : UpdateEmployee

    ){}


    create = async (req: Request, res: Response)=>{
        try{
            const { id, name, lastName, position, salary, contractTermination, team,yearsOfSerice } = req.body;
            const employee = await this.createEmployee.execute(id,name,lastName, position, salary, contractTermination, team, yearsOfService);
            res.status(201).json(employee);
        }catch(err: any){
            res.status(400).json({error: err.message})
        }
    }

    get = async (req: Request, res: Response)=>{
        try{
            const {id} = req.params;
            const user = await this.getEmployees.execute(id);
        }catch(err: any){

            res.status(404).json({error: err.message})

        }
    }

    getAll= async (req: Request, res: Response)=>{
        try{
            const employees = await this.getAllEmployees.execute();
            res.status(200).json(employees)

        }catch (err: any){
            res.status(404).json({error: err.message});
        }
    }

    update= async (req: Request, res: Response)=>{
        try{
           const { id } = req.params;
           const {name, email} = req.body;
           const employee = await this.UpdateEmployee.execute(id,name,email);
           res.status(200).json(employee);

        }catch (err: any){
            res.status(404).json({error: err.message});
        }
    }

    delete= async (req: Request, res: Response)=>{
        try{
           const { id } = req.params;
           const employee = await this.deleteEmployee.execute(id);
           res.status(204).json(employee);
        }catch (err: any){
            res.status(404).json({error: err.message});
        }
    }
}