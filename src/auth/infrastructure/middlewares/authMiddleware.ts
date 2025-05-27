import { NextFunction, Request, Response } from "express";
import axios from 'axios';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        res.status(401).json({error: 'No token provided'});
    }

    const token = authHeader.split(' ')[1];

    try{
        const response = await axios.post('https://localhost:4000/auth/verify-token', { token });

        if(response.data.valid) {
            //locals es para compartir datos en las diferentes partes del middleware entre rutas, basicamente la url de postman que haces /employees-getAllEmployees en mitad de esas cosas va el middleware de verificación
            res.locals.user = {
                id: response.data.user.id,
                role: response.data.user.role
            }
            return next()
        }else{
            res.status(401).json({error: 'Invalid token'})
        }
    }catch{
        res.status(401).json({error: 'Token verificacion failed'});
    };
}; 
