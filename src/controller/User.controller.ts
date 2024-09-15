import { Request, Response } from "express";
import { UserService } from "../services/User.service";




export class UserController {
    private secretJWT = process.env.JWT_SECRET_KEY || "";

    static async createUser(req: Request, res: Response): Promise<void> {
        try {
            const userService = new UserService();
            const { name, password, email, permission_id, permissionUser_id, squad_id, title_id } = req.body;

            if (!name || !password || !email) {
                res.status(400).json({ message: "Missing required fields" })
                return
            };
            const user = await userService.createUser(
                name,
                email,
                password,
                title_id,
                permissionUser_id,
                permission_id,
                squad_id
            );
            res.status(201).json({ message: user })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Internal server error" })
        }
    }


    static async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const userService = new UserService();
            const token = req.headers.authorization?.split(" ")[1];

            if (!token) {
                res.status(400).json({ message: 'Token not provider' })
                return;
            }

            const user = await userService.getAllUser();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const userService = new UserService();
            const user_id = parseInt(req.params.user_id, 10);

            const user = await userService.getUserById(user_id);

            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async updatedUser(req: Request, res: Response):Promise<void>{
        try{
            const userService = new UserService();
            const user_id = parseInt(req.params.user_id, 10);
            const {name, email, password, title_id, permission_id, permissionUser_id, squad_id} = req.body;
           
            if(!user_id){
                res.status(404).json({error: 'User not found'})
                return
            }
            
            const updatedUser = await userService.updatedUser(user_id, name, email, password, title_id, permission_id, permissionUser_id, squad_id );

           
            res.status(200).json(updatedUser);

        }catch(error){
            console.log(error);
            res.status(500).json('Internal server error');
        }
    }

    static async deleteUser(req: Request, res: Response):Promise<void>{
        try{
            const userService = new UserService();
            const user_id = parseInt(req.params.user_id, 10);

            const deleteUser = await userService.deleteUser(user_id);

            res.status(200).json(deleteUser);
        }catch(error){
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    
}

export default UserController;