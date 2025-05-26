import { Employee } from "@employees/domain/models/Employee";
import { EmployeeRepository } from "@employees/domain/repositories/EmployeeRepository";

export class FindByFilter {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(
    filter: Partial<{
      name: string;
      position: "junior" | "senior" | "teamLeader" | "ceo";
    }>,
  ): Promise<Employee[]> {
    const employee = await this.employeeRepository.findByFilter(filter);
    if (!employee) throw new Error("Nothing found ");
    //esto esta mal pues si son varios deberia devolverlos igualmente
    return employee;

    //    if(name){
    //        const employee = await this.employeeRepository.findByFilter(name);

    //    }
    //    if(position === undefined){

    //    }
    //     return employee;
  }
}
