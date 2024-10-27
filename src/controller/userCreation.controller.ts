import { Request, Response } from "express";
import { UserCreateDTO } from "../dto/UserCreateDTO";
import { UserCreationService } from "../services/UserCreation.service";

export class UserCreationController {
    static async createUser(req: Request, res: Response): Promise<void> {
        const userCreationService = new UserCreationService();
        try {
            const user_id = (req as any).user_id;
            console.log("User ID do criador:", user_id);
            const userCreateDTO: UserCreateDTO = req.body;
            console.log("Dados recebidos:", userCreateDTO);
    
            // Validação dos campos obrigatórios
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
    
        
    static async getUsersCreatedBy(req: Request, res: Response): Promise<void> {
        const userCreationService = new UserCreationService();
        try {
            const user_id = (req as any).user_id; 
            const users = await userCreationService.getUsersCreatedBy(user_id);
            res.status(200).json(users);
        } catch (error: any) {
            res.status(400).json({ message: error.message || "Erro interno do servidor" });
        }
    }
}
