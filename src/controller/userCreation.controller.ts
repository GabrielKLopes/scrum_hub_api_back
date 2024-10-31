import { Request, Response } from "express";
import { UserCreateDTO } from "../dto/UserCreateDTO";
import { UserCreationService } from "../services/UserCreation.service";

export class UserCreationController {
    static async createUser(req: Request, res: Response): Promise<void> {
        const userCreationService = new UserCreationService();
        try {
            const user_id = (req as any).user_id;
            const userCreateDTO: UserCreateDTO = req.body;
    
            if (!userCreateDTO.name || !userCreateDTO.email || !userCreateDTO.password ||
                userCreateDTO.permissionUser_id === undefined || 
                userCreateDTO.permission_id === undefined || 
                userCreateDTO.squad_id === undefined || 
                userCreateDTO.permissionUser_id <= 0 || 
                userCreateDTO.permission_id <= 0 || 
                userCreateDTO.squad_id <= 0) {
                res.status(400).json({ message: "Campos obrigatórios estão faltando." });
                return;
            }
    
            const newUserCreated = await userCreationService.createUser(user_id, userCreateDTO);
            res.status(201).json({ message: "Usuário criado com sucesso", user: newUserCreated });
        } catch (error: any) {
            console.error("Erro ao criar usuário:", error.message);
            res.status(400).json({ message: error.message || "Erro interno do servidor" });
        }
    }
    
    static async getAllUsers(req: Request, res: Response): Promise<void> {
        const userCreationService = new UserCreationService();
        try {
            const users = await userCreationService.getAllUsers();
            res.status(200).json(users);
        } catch (error: any) {
            res.status(400).json({ message: error.message || "Erro interno do servidor" });
        }
    }

    static async deleteUser(req: Request, res: Response): Promise<void> {
        const userCreationService = new UserCreationService();
        try {
            const userId = parseInt(req.params.user_id, 10); 
    
            if (isNaN(userId) || userId <= 0) {
                res.status(400).json({ message: "ID de usuário inválido." });
                return;
            }
    
            await userCreationService.deleteUser(userId);
            res.status(200).json({ message: "Usuário deletado com sucesso." });
        } catch (error: any) {
            console.error("Erro ao deletar usuário:", error.message);
            res.status(400).json({ message: error.message || "Erro interno do servidor" });
        }
    }

    static async getUserById(req: Request, res: Response): Promise<void> {
        const userCreationService = new UserCreationService();
        try {
            const userId = parseInt(req.params.user_id, 10); 

            if (isNaN(userId) || userId <= 0) {
                res.status(400).json({ message: "ID de usuário inválido." });
                return;
            }

            const user = await userCreationService.getUserById(userId);
            res.status(200).json(user);
        } catch (error: any) {
            console.error("Erro ao buscar usuário:", error.message);
            res.status(400).json({ message: error.message || "Erro interno do servidor" });
        }
    }

    // Controller com logs adicionais
    static async updateUser(req: Request, res: Response): Promise<void> {
        const userCreationService = new UserCreationService();
        try {
            const userId = parseInt(req.params.user_id, 10);
            
            const {
                name,
                email,
                password,
                permissionUser, 
                permission,      
                squad            
            } = req.body;
    
            if (isNaN(userId) || userId <= 0) {
                res.status(400).json({ message: "ID de usuário inválido." });
                return;
            }
    
            if (!name && !email && !password && !permissionUser && !permission && !squad) {
                res.status(400).json({ message: "Nenhum campo para atualizar." });
                return;
            }
    
            const updatedUser = await userCreationService.updateUser(userId, {
                name,
                email,
                password,
                permissionUser_id: permissionUser?.permissionUser_id, 
                permission_id: permission?.permission_id, 
                squad_id: squad?.squad_id
            });
    
            res.status(200).json({ message: "Usuário atualizado com sucesso.", user: updatedUser });
        } catch (error: any) {
            console.error("Erro ao atualizar usuário:", error.message);
            res.status(400).json({ message: error.message || "Erro interno do servidor" });
        }
    }
    
    
}
