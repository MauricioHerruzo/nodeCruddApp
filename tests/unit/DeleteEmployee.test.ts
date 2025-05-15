import { DeleteEmployee } from "application/use-cases/DeleteEmployee";
import { InMemoryUserRepo } from "infrastructure/repositories/inMemoryUserRepo";
import { CreateEmployee } from "application/use-cases/CreateEmployee";

describe("Delete Employee Use Case", () => {
  it("should delete an employee found by id", async () => {
    const repo = new InMemoryUserRepo();
    const deleteEmployee = new DeleteEmployee(repo);
    const createEmployee = new CreateEmployee(repo);

    //tengo que crear uno
    const employee = await createEmployee.execute(
      null,
      "Manolo",
      "Manolez",
      "junior",
      2000,
      "27-7-2026",
      "team4",
      4,
    );
    //si no lo borro el test falla, el test funciona
    await deleteEmployee.execute(employee.getId());

    expect(repo.getEmployees()).toMatchObject([]);
  });
});
