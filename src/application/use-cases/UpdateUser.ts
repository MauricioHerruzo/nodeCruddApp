import { Employee } from 'domain/models/Employee';
import { EmployeeRepository } from 'domain/repositories/EmployeeRepository';
import { emit } from 'process';

export class UpdateEmployee {
    constructor(private readonly userRepository: EmployeeRepository){

    }
    async execute(id: string, name: string, lastName:string, position: "junior" | "senior" | "teamLeader" | "ceo", salary: number, contractTermination: string, team: string, yearsOfService: number){
        
        const user = await this.employeeRepo.findById(id);
        if(!employee) throw new Error(" User not found");
    
        employee.changeName(name);
        employee.changeLastName(lastName);
    
        await this.employeeRepo.update(user);
    
        return employeeInfo;

    }

}