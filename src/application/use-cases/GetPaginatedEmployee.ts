import { EmployeeRepository } from "domain/repositories/EmployeeRepository";


export class GetPaginatedEmployee {
    constructor(private employeeRepository: EmployeeRepository){}

    async execute(page: number, limit: number)  {
        const { employees, total } = await this.employeeRepository.pagePagination(page, limit);

        return {
            data: employees,
            page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
        }
    }
}