import { JobRepository } from "contextJobs/domain/repositories/JobRepository"; 

export class DeleteJob {
  constructor(private readonly jobRepository: JobRepository) {}

  async execute(id: string) {
    const employee = await this.jobRepository.findById(id);

    if (!employee) throw new Error("User not found");

    await this.jobRepository.delete(id);
  }
}
