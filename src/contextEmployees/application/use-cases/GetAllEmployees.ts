import { EmployeeRepository } from "@employees/domain/repositories/EmployeeRepository";

export class GetAllEmployees {
  constructor(private readonly employeeRepository: EmployeeRepository) {}
  async execute() {
    return await this.employeeRepository.findAll();
  }
}
