import { Job } from "contextJobs/domain/models/Job"; 
import { JobRepository } from "contextJobs/domain/repositories/JobRepository"; 

//Has creado la carpta db con el prismaclient para instanciarlo alli y lo exportas, aqui lo importas
// import prisma from "@prisma/client";
import prisma  from "./db/PrismaClient";

export class PrismaJobRepo implements JobRepository {

    //ESTAMOS USANDO PRISMA EN VEZ DE QUERYS SQL, prisma ya hace su puente con la base de datos
    async findById(id: string): Promise<Job | null> {
        const job = await prisma.job.findUnique({where: { id }});

        return job 
        ? new Job(job.id, job.name, job.vacancy, job.employeeId)
        : null;
    }

    async findAll(): Promise<Job[]> {
        // las funciones de prima estan en su documentacion 
        const job = await prisma.job.findMany();

        return job.map(job => new Job(job.id,job.name, job.vacancy, job.employeeId))
    }

    async create(job : Job): Promise<void> {
        await prisma.job.create({
            data:{
                id:job.getId(),
                name : job.getName(),
                vacancy: job.getVacancy(),
                employeeId: job.getEmployeeId(),
            }
        });
    }

    async update (job: Job): Promise<void>{
        await prisma.job.update({
            where:{ id: job.getId()},
            data: {
                name : job.getName(),
                vacancy: job.getVacancy(),
                employeeId: job.getEmployeeId(),
            }
        })
    }
    
    async delete(id: string): Promise<void>{
        await prisma.job.delete({where: { id }});
    }

    async findByFilter(filter: Partial<{ name: string; vacancy: boolean }>): Promise<Job[]> {
        const jobs = await prisma.job.findMany({
            //ESTO ES LENGUAJE DE PRISMA
            where : {
                name: filter.name ? { contains: filter.name} : undefined,
                vacancy : filter.vacancy ? { equals: filter.vacancy} : undefined,
            }
        });

        return jobs.map(job => new Job(job.id,job.name, job.vacancy, job.employeeId))
    }

    async updateEmployeeId(jobId: string, data: { employeeId: string; vacancy: boolean }): Promise<Job> {
        const job = await prisma.job.update({
            where: {id: jobId},
            data,
        })
        return new Job(job.id, job.name, job.vacancy, job.employeeId);
    }

}