import { JobRepository } from "contextJobs/domain/repositories/JobRepository"; 

export class GetAllJobs {
  constructor(private readonly jobRepository: JobRepository) {}
  async execute() {
    return await this.jobRepository.findAll();
  }
}
