import { swaggerJSDoc } from 'swagger-jsdoc'

const options = {
    definition:{
        openapi: '3.0.0',
        info: {
            title: 'API CRUD',
            version: '1.0.0',
            description: 'Documentation for API CRUD rest'
        },
        servers: [
            {
                url: 'http://localhost'
            }
        ],
    },
    apis: ['./src/contextEmployees/interfaces/http/routes/employeeRoutes.ts']
};

export const swaggerSpec = swaggerJSDoc(options);

