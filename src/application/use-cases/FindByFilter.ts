import { Employee } from 'domain/models/Employee';
import { EmployeeRepository } from 'domain/repositories/EmployeeRepository';

export class findByFilter {
    constructor(private readonly employeeRepository: EmployeeRepository){}

    async execute(name: string, position: 'junior' | 'senior' | 'teamLeader' | 'ceo'): Promise<Employee>{
        const employee = await this.employeeRepository.findByFilter(name);

        if(!employee) throw new Error("User not found");

        return employee;
    }
}