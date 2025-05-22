//el export es porque vas a exportar la clase a otros archivos
export class Employee {
  private readonly id: string;
  private name: string;
  private lastName: string;
  private position: "junior" | "senior" | "teamLeader" | "ceo";
  private salary: number;
  private contractTermination: string;
  private team: string;
  private yearsOfService: number;

  constructor(
    id: string,
    name: string,
    lastName: string,
    position: "junior" | "senior" | "teamLeader" | "ceo",
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

  public changeName(newName): void {
    this.name = newName;
  }

  public changeLastName(newLastName): void {
    this.lastName = newLastName;
  }

  public changePosition(
    newPosition: "junior" | "senior" | "teamLeader" | "ceo",
  ): void {
    this.position = newPosition;
  }

  public changeSalary(newSalary: number): void {
    this.salary = newSalary;
  }

  public changeContractTermination(newContractTermination): void {
    this.contractTermination = newContractTermination;
  }

  public changeTeam(newTeam): void {
    this.team = newTeam;
  }

  public changeYearsOfService(newYearsOfService): void {
    this.yearsOfService = newYearsOfService;
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

  public getPosition():  "junior" | "senior" | "teamLeader" | "ceo" {
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
