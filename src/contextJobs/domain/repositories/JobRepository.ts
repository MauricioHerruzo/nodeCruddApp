//importas los objetos que vas a usar
import { Job } from "../models/Job"; 
// los repositories son para interfaces
// estas inferaces son para las funcienes que pueda ejecutar el usuario
export interface JobRepository {
  findById(id: string): Promise<Job | null>;
  findAll(): Promise<Job[]>;
  create(job: Job): Promise<void>;
  update(job: Job): Promise<void>;
  delete(id: string): Promise<void>;
  findByFilter(
    filter: Partial<{ name: string; vacancy: boolean }>,
  ): Promise<Job[]>;

  updateEmployeeId(jobId: string, data: { employeeId: string; vacancy: boolean }): Promise<Job>
}

