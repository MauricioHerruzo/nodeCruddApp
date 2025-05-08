import { Employee } from 'domain/models/Employee';
import { EmployeeRepository } from 'domain/repositories/EmployeeRepository';

export class InMemoryUserRepo implements EmployeeRepository{
     private users: Employee[]=[];

         async findById(id:string): Promise < Employee | null>{
            return this.employees.find(employee => employee.getId() === id)
         }

         async findAll(): Promise <Employee[]>{
            return this.employees;
         }

         async create(employee: Employee): Promise<void>{
            this.employees = [...this.users, user];
         }

         async update(employeeParam: Employee): Promise<void>{
            const employee = this.employees.find(employee => employee.getID() === employeeParam.getID())

            if(!employee) throw new Error('User not found');

            this.users = [
                ...this.employees.filter(employee => employee.getId()!== employeeParam.getId()), employeeParam
            ]
         }

         async delete(id: string): Promise <void>{
            this.employees = this.employees.filter(employee => employee.getId() !== id);
         }
}