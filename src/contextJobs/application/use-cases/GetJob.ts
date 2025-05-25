import { Job } from "contextJobs/domain/models/Job"; 
import { JobRepository } from "contextJobs/domain/repositories/JobRepository"; 

export class GetJob {
  constructor(private readonly jobRepository: JobRepository) {}

  async execute(id: string): Promise<Job> {
    const job = await this.jobRepository.findById(id);

    if (!job) throw new Error("User not found");

    return job;
  }
}
