import { v4 as uuid } from "uuid";

import { Job } from "contextJobs/domain/models/Job"; 
import { JobRepository } from "contextJobs/domain/repositories/JobRepository"; 

//una clase que solo hace una cosa
export class CreateJob {
  constructor(private readonly jobRepo: JobRepository) {}

  async execute(
    name: string,
    vacancy: boolean,
    employeeId: string | null,
  ) {
    const job = new Job(
      uuid(),
      name,
      vacancy,
      employeeId,
    );

    await this.jobRepo.create(job);

    return job;
  }
}
