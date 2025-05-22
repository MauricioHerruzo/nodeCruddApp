import { Employee } from "domain/models/Employee";
import { EmployeeRepository } from "domain/repositories/EmployeeRepository";

export class UpdateEmployee {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(
    id: string,
    name: string,
    lastname: string,
    position: string,
    salary: number,
    contractTermination: string,
    team: string,
    yearsOfService: number,

  ) {
    const employee = await this.employeeRepository.findById(id);
    if (!Employee) throw new Error("User not found");

    employee.changeName(name);
    employee.changeLastName(lastname);
    employee.changePosition(position);
    employee.changeSalary(salary);
    employee.changeContractTermination(contractTermination);
    employee.changeTeam(team);
    employee.changeYearsOfService(yearsOfService);
    

    await this.employeeRepository.update(employee);

    return employee;
  }
}
