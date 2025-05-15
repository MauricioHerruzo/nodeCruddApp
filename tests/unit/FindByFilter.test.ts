import { FindByFilter } from "application/use-cases/FindByFilter";
import { InMemoryUserRepo } from "infrastructure/repositories/inMemoryUserRepo";
import { CreateEmployee } from "application/use-cases/CreateEmployee";

describe("Find By either name or position Use Case", () => {
  it("Should find any employee to match with the filtered Name, position or Both", async () => {
    const repo = new InMemoryUserRepo();
    const findByFilter = new FindByFilter(repo);
    const createEmployee = new CreateEmployee(repo);

    const employeeCreated = await createEmployee.execute(
      null,
      "Manolo",
      "Manolez",
      "junior",
      2000,
      "27-7-2026",
      "team4",
      4,
    );
    const employeeFound = await findByFilter.execute({ name: "Manolo" });
    console.log(employeeFound);
    expect(employeeFound).toMatchObject([employeeCreated]);
  });
});
