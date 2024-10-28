import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import Jwt, { JwtPayload } from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User.entity';

dotenv.config();

const secretJWT = process.env.JWT_SECRET_KEY || "";

interface CustomRequest extends Request {
    user_id?: number;
}

export async function authorization(req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
   

    if (!token) {
        return res.status(400).send({ message: "Access denied" });
    }

    const tokenSplited = token.split('Bearer ');

    try {
        const decoded = Jwt.verify(tokenSplited[1], secretJWT) as JwtPayload;

        if (!decoded) {
            return res.status(401).send({ message: "Access denied" });
        }

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { email: decoded.email }, relations: ['permission', 'permissionUser'] });

        if (!user) {
            return res.status(403).send({ message: 'Permission denied' });
        }
        if(req.url.startsWith("/session/user/") && req.method == "DELETE" && user.permission?.permission_id !== 1){
           
            return res.status(403).send({ message: "Permission denied for delete" });
        }
        if(req.url.startsWith("/session/user/create") && req.method == "POST" && user.permission?.permission_id !== 1){
            return res.status(403).send({ message: "Permission denied for created" });
        }
        if(req.url.startsWith("/session/user/") && req.method == "PUT" && user.permission?.permission_id !== 1){
            return res.status(403).send({ message: "Permission denied for update" });
        }
        if(req.url.startsWith("/session/squad/createSquad") && req.method === "POST" && user.permissionUser?.permissionUser_id !==1){
            return res.status(403).send({message: "Permission denied for create squad"});
        }
        if(req.url.startsWith("/session/squad/") && req.method === "PUT" && user.permissionUser?.permissionUser_id !==1){
            return res.status(403).send({message: "Permission denied for update squad"});
        }
        if(req.url.startsWith("/session/squad/") && req.method === "DELETE" && user.permissionUser?.permissionUser_id !==1){
            return res.status(403).send({message: "Permission denied for delete squad"});
        }

     
        
        req.user_id = user.user_id; 
        console.log("User ID do middleware:", req.user_id); 
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send({ message: "Acess denied" });
    }
}
