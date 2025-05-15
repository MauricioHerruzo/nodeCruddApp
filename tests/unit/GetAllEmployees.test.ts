import { GetAllEmployees } from "application/use-cases/GetAllEmployees";
import { InMemoryUserRepo } from "infrastructure/repositories/inMemoryUserRepo";

describe("Get All Employees Use Case", () => {
  it("Should return all employees in an array", async () => {
    const repo = new InMemoryUserRepo();
    const getAllEmployees = new GetAllEmployees(repo);

    await getAllEmployees.execute();
    const employeesArray = repo.getEmployees();

    expect(employeesArray).toMatchObject([]);
  });
});
