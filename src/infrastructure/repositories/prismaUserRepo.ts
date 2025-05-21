
import { GetAllEmployees } from "application/use-cases/GetAllEmployees";

import { Employee } from "domain/models/Employee";
import { EmployeeRepository } from "domain/repositories/EmployeeRepository";

//Has creado la carpta db con el prismaclient para instanciarlo alli y lo exportas, aqui lo importas
import prisma from "@prisma/client";

export class PrismaEmployeeRepo implements EmployeeRepository {

    //ESTAMOS USANDO PRISMA EN VEZ DE QUERYS SQL, prisma ya hace su puente con la base de datos
    async findById(id: string): Promise<Employee | null> {
        const employee = await prisma.employee.findUnique({where: { id }});

        return employee 
        ? new Employee(employee.id,employee.name, employee.lastName, employee.position, employee.salary, employee.contractTermination, employee.team, employee.yearsOfService)
        : null;
    }

    async findAll(): Promise<Employee[]> {
        // las funciones de prima estan en su documentacion 
        const employee = await prisma.user.findMany();

        return employee.map(employee => new Employee(employee.id,employee.name, employee.lastName, employee.position, employee.salary, employee.contractTermination, employee.team, employee.yearsOfService))
    }

    async create(employee : Employee): Promise<void> {
        await prisma.employee.create({
            data:{
                id:employee.getId(),
                name : employee.getName(),
                lastName: employee.getLastName(),

            }
        });
    }

    async update (employee: Employee): Promise<void>{
        await prisma.employee.update({
            where:{ id: employee.getId()},
            data: {
                name: employee.getName(),
                //TODO EL RESTO
            }
        })
    }
    
    async delete(id: string): Promise<void>{
        await prisma.employee.delete({where: { id }});
    }

    async findByFilter(filter: Partial<{ name: string; email: string; }>): Promise<Employee[]> {
        const employees = await prisma.employee.findMany({
            //ESTO ES LENGUAJE DE PRISMA
            where : {
                name: filter.name ? { contains: filter.name} : undefined,
                position : filter.position ? { contains: filter.email} : undefined,
            }
        })
        return employees.map(employee => new Employee(employee.id,employee.name, employee.lastName, employee.position, employee.salary, employee.contractTermination, employee.team, employee.yearsOfService)
    }.


    async pagePagination(page: number, limit: number): Promise<{ employees: Employee[]; total: number; }> {
        
        const paginatedEmployees =
        //en el inmemory tienes un limit y un noseque
        //mira la documentación de prisma porque tienen que existir  funciones para eso, igual que en sql esta el LIMIT y el OFFSET

    }
}