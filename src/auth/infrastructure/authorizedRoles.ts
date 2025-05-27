import { NextFunction, Request, Response } from "express";
import { UserRole } from "auth/domain/UserRole";

export const authorizeRoles = (allowedRoles: UserRole[])=>{
    //el _: es par obviar el Request que no lo vamos a usar
    return (_: Request, res: Response, next: NextFunction)=>{
        const user= res.locals.user;

        if(!user){
            res.status(401).json({error: 'Not authenticated'});
            return ;
        } 

        if(!allowedRoles.includes(user.role)){
            res.status(403).json({error:'Access denied'});
            return;
        }

        next();
    };
};