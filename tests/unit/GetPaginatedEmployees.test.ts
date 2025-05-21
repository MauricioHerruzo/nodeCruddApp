import { GetPaginatedEmployee } from "application/use-cases/GetPaginatedEmployee"; 
import { InMemoryUserRepo } from "infrastructure/repositories/inMemoryUserRepo";
import { Employee } from "domain/models/Employee";

describe("GetPaginated Employee use-case", () => {
  it("should return paginated employees", async () => {
    const repo = new InMemoryUserRepo();

    // Hay que crear empleados para probar
    for (let i = 0; i < 6; i++) {
      const employee = new Employee(
        null,
        "Manolo",
        "Manolez",
        "junior",
        2000,
        "27-8-2026",
        "team4",
        2
      );
      await repo.create(employee);
    }

    const getPaginatedEmployee = new GetPaginatedEmployee(repo);
    const result = await getPaginatedEmployee.execute(1, 5);

    expect(result.data.length).toBe(5); 
    expect(result.page).toBe(1); 
    expect(result.totalPages).toBe(2); 
    expect(result.totalItems).toBe(6); 
  });
});
