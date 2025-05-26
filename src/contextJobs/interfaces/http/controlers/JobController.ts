/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request } from "express";

// import all use cases
import { CreateJob } from "contextJobs/application/use-cases/CreateJob"; 
import { DeleteJob } from "contextJobs/application/use-cases/DeleteJob";
import { FindJobByFilter } from "contextJobs/application/use-cases/FindByFilter"; 
import { GetAllJobs } from "contextJobs/application/use-cases/GetAllJobs";
import { GetJob } from "contextJobs/application/use-cases/GetJob";
import { AssingEmployeeToJob } from "@jobs/application/use-cases/AssingEmployee";


export class JobController {
  constructor(
    private readonly createJob: CreateJob,
    private readonly deleteJob: DeleteJob,
    private readonly getAllJobs: GetAllJobs,
    private readonly getJob: GetJob,
    private readonly findByFilter: FindJobByFilter,
    private readonly assingEmployeeToJob: AssingEmployeeToJob

  ) { }

  create = async (req: Request, res: Response) => {
    try {
      const {
        name,
        vacancy,
        employeeId
      } = req.body;
      const job = await this.createJob.execute(
        name,
        vacancy,
        employeeId
      );
      res.status(201).json(job);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  get = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const job = await this.getJob.execute(id);
      res.json(job);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  };

  getAll = async (_: Request, res: Response) => {
    try {
      const jobs = await this.getAllJobs.execute();
      res.status(200).json(jobs);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const job = await this.deleteJob.execute(id);
      res.status(204).json(job);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  };

  filter = async (req: Request, res: Response) => {
    try {
      const filter: Partial<{
        name: string;
        vacancy: boolean;
      }> = req.query;
      const job = await this.findByFilter.execute(filter);
      res.status(200).json(job);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  };

    assignEmployee = async (req: Request, res: Response) => {
    try {
      const { jobId, employeeId } = req.params;

      const updatedJob = await this.assingEmployeeToJob.execute(jobId, employeeId);
      res.status(200).json(updatedJob);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };


}
