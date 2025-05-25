import { Job } from "contextJobs/domain/models/Job"; 
import { JobRepository } from "contextJobs/domain/repositories/JobRepository"; 

export class FindJobByFilter {
  constructor(private readonly jobRepository: JobRepository) {}

  async execute(
    filter: Partial<{
      name: string;
      vacancy: boolean;
    }>,
  ): Promise<Job[]> {
    const job = await this.jobRepository.findByFilter(filter);

    if (!job) throw new Error("Nothing found ");

    return job;
  }
}
