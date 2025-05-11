import { Employee } from 'domain/models/Employee';
import { EmployeeRepository } from 'domain/repositories/EmployeeRepository';

export class GetUser {
    constructor(private readonly employeeRepository: EmployeeRepository){}

    async execute(id: string){
        const employee = this.employeeRepository.findById(id);

        if(!employee) throw new Error("User not found");

        return employee;
    }
}