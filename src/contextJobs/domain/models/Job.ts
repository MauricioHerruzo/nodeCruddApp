//el export es porque vas a exportar la clase a otros archivos
export class Job {
  private readonly id: string;
  private name: string;
  private vacancy: boolean;
  private employeeId: string | null;

  constructor(
    id: string,
    name: string,
    vacancy: boolean,
    employeeId: string | null,

  ) {
    this.id = id;
    this.name = name;
    this.vacancy = vacancy;
    this.employeeId = employeeId;

  }


  //CHANGE METHODS

  public changeName(newName?: string): void {
    this.name = newName || this.name;
  }

  public changeVacancy(newVacancy?: boolean): void {
    this.vacancy = newVacancy || this.vacancy;
  }

  public changePosition(
    newEmployeeId?: string,
  ): void {
    this.employeeId = newEmployeeId || this.employeeId;
  }


  //GET METHODS
  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getVacancy(): boolean {
    return this.vacancy;
  }

  public getEmployeeId():  string | null {
    return this.employeeId;
  }

}
