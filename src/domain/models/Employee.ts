//el export es porque vas a exportar la clase a otros archivos
export class Employee {
  private readonly id: string;
  private name: string;
  private lastName: string;
  private position: string;
  private salary: number;
  private contractTermination: string;
  private team: string;
  private yearsOfService: number;

  constructor(
    id: string,
    name: string,
    lastName: string,
    position: string,
    salary: number,
    contractTermination: string,
    team: string,
    yearsOfService: number,
  ) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.position = position;
    this.salary = salary;
    this.contractTermination = contractTermination;
    this.team = team;
    this.yearsOfService = yearsOfService;
  }


  //CHANGE METHODS

  public changeName(newName?: string): void {
    this.name = newName || this.name;
  }

  public changeLastName(newLastName?: string): void {
    this.lastName = newLastName || this.lastName;
  }

  public changePosition(
    newPosition?: string,
  ): void {
    this.position = newPosition || this.position;
  }

  public changeSalary(newSalary?: number): void {
    this.salary = newSalary || this.salary;
  }

  public changeContractTermination(newContractTermination?: string): void {
    this.contractTermination = newContractTermination || this.contractTermination;
  }

  public changeTeam(newTeam?: string): void {
    this.team = newTeam || this.team;
  }

  public changeYearsOfService(newYearsOfService?: number): void {
    this.yearsOfService = newYearsOfService || this.yearsOfService;
  }




  //GET METHODS
  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getPosition():  string {
    return this.position;
  }

   public getSalary(): number {
    return this.salary;
  }

   public getContractTermination(): string {
    return this.contractTermination;
  }  

   public getTeam(): string {
    return this.team;
  }  

   public getYearsOfService(): number {
    return this.yearsOfService;
  }  
  
}
