/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request } from "express";

// import all use cases
import { CreateEmployee } from "application/use-cases/CreateEmployee";
import { DeleteEmployee } from "application/use-cases/DeleteEmployee";
import { GetAllEmployees } from "application/use-cases/GetAllEmployees";
import { GetEmployee } from "application/use-cases/GetEmployee";
import { UpdateEmployee } from "application/use-cases/UpdateEmployee";
import { FindByFilter } from "application/use-cases/FindByFilter";
import { GetPaginatedEmployee } from "application/use-cases/GetPaginatedEmployee";

export class EmployeeController {
  constructor(
    private readonly createEmployee: CreateEmployee,
    private readonly deleteEmployee: DeleteEmployee,
    private readonly getAllEmployees: GetAllEmployees,
    private readonly getEmployee: GetEmployee,
    private readonly UpdateEmployee: UpdateEmployee,
    private readonly findByFilter: FindByFilter,
    private readonly getPaginatedEmployee: GetPaginatedEmployee
  ) { }

  create = async (req: Request, res: Response) => {
    try {
      const {
        name,
        lastName,
        position,
        salary,
        contractTermination,
        team,
        yearsOfService,
      } = req.body;
      const employee = await this.createEmployee.execute(
        name,
        lastName,
        position,
        salary,
        contractTermination,
        team,
        yearsOfService,
      );
      res.status(201).json(employee);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  get = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const employee = await this.getEmployee.execute(id);
      res.json(employee);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  };

  getAll = async (_: Request, res: Response) => {
    try {
      const employees = await this.getAllEmployees.execute();
      res.status(200).json(employees);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, lastName, position, salary, contractTermination, team, yearsOfService } = req.body;

      const employee = await this.UpdateEmployee.execute(id, name, lastName,position, salary, contractTermination,team,yearsOfService);

      res.status(200).json(employee);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const employee = await this.deleteEmployee.execute(id);
      res.status(204).json(employee);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  };

  filter = async (req: Request, res: Response) => {
    try {
      const filter: Partial<{
        name: string;
        position: "junior" | "senior" | "teamLeader" | "ceo";
      }> = req.query;
      const employee = await this.findByFilter.execute(filter);
      res.status(200).json(employee);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  };

  pagination = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;

    try {
      const result = await this.getPaginatedEmployee.execute(page, limit);
      res.status(200).json(result);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }
}
