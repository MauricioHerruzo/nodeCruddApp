import { GetAllEmployees } from "application/use-cases/GetAllEmployees";

export class EmployeeController {
    constructor(
        private readonly getEmployees : GetAllEmployees,
        private readonly  createEmployee : CreateEmployee,

    ){}


    create = async (req: Request, res: Response)=>{
        try{
            const {name, email } = req.body;
            const ser= await this.createEmployee.execute(name,email);
            res.status(201).json(user);
        }catch(err: any){
            res.status(400).json({error: err.message})
        }
    }

    get = async (req: Resquest, res: Response)=>{
        try{
            const {id} = req.params;
            const user = await this.getEmployee.execute(id);
            res.status(404).json(employee)
        }catch(err: any){

        }
    }
}