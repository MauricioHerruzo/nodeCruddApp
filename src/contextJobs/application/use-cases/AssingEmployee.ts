import { JobRepository } from "@jobs/domain/repositories/JobRepository";
import { EmployeeRepository } from "@employees/domain/repositories/EmployeeRepository";

export class AssingEmployeeToJob {
    constructor(
        private readonly jobRepo: JobRepository,
        private readonly employeeRepo: EmployeeRepository,
    ) {}

    async execute (jobId: string, employeeId: string) {
        const employee= await this.employeeRepo.findById(employeeId)
        if(!employee) {
            throw new Error(" Nothing found ")
        }

        const updatedJob = await this.jobRepo.updateEmployeeId(jobId,{employeeId, vacancy: false})
        return updatedJob;
    }
}