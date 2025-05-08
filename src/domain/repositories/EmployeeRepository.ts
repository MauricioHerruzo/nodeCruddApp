//importas los objetos que vas a usar
import { Employee } from 'domain/models/Employee'
// los repositories son para interfaces
// estas inferaces son para las funcienes que pueda ejecutar el usuario
export interface EmployeeRepository {
    findById(id:string): Promise < Employee | null>;
    findAll(): Promise <Employee[]>;
    create(employee: Employee): Promise<void>;
    update(employee: Employee): Promise<void>;
    delete(id: string): Promise <void>;
}