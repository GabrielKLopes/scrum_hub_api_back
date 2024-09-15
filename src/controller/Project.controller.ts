import { Request, Response } from "express";
import { ProjectService } from "../services/Project.service";


export class ProjectController{

    static async createProject(req: Request, res:Response): Promise<void>{
      try{
        const projectService = new ProjectService(); 

        const {name, description, squad_id} = req.body;
        const user_id = (req as any).user_id;

        const project = await projectService.createProject(name, description, squad_id, user_id);
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            res.status(400).json({ message: 'Token not provider' })
            return;
        }
        res.status(200).json({project});
       
      }catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
      }
    }

    static async getAllProjet(req: Request, res:Response):Promise<void>{
        try{
            const projectService = new ProjectService(); 
            const token = req.headers.authorization?.split(" ")[1];

            if (!token) {
                res.status(400).json({ message: 'Token not provider' })
                return;
            }

            const project = await projectService.getAllProject();
            res.status(200).json({project});

        }catch(error){
            res.status(500).json({message: 'Internal Server Error'});
        }
    }

    static async getProjectById(req: Request, res:Response):Promise<void>{
        try{
            const projectService = new ProjectService(); 
            const token = req.headers.authorization?.split(" ")[1];
            const project_id = parseInt(req.params.project_id, 10);

            if (!token) {
                res.status(400).json({ message: 'Token not provider' })
                return;
            }

            if(!project_id){
                throw new Error("Project not found")
            }

            const project = await projectService.getProjectById(project_id);
            res.status(200).json({project});
        }catch(error){
            res.status(500).json({message: 'Internal Server Error'});
        }
    }

    static async updateProject(req: Request, res: Response): Promise<void>{
      try{
        const projectService = new ProjectService(); 
        const token = req.headers.authorization?.split(" ")[1];
        const project_id = parseInt(req.params.project_id, 10);
        const {name, description, squad_id} = req.body;
        if (!token) {
            res.status(400).json({ message: 'Token not provider' })
            return;
        }
        if(!project_id){
            throw new Error("Project not found")
        }

        const updateProject = await projectService.updateProject(project_id, name, description, squad_id);
        res.status(200).json(updateProject);
      }catch(error){
        res.status(500).json("Internal Server Error");
      }
    }

    static async deleteProject(req: Request, res:Response): Promise<void>{
        try{
            const projectService = new ProjectService();
            const token = req.headers.authorization?.split(" ")[1];
            const project_id = parseInt(req.params.project_id, 10);
            
            if (!token) {
                res.status(400).json({ message: 'Token not provider' })
                return;
            }
            if(!project_id){
                throw new Error("Project not found")
            }

            const deleteProject = await projectService.deleteProject(project_id);
            res.status(201).json(deleteProject)
        }catch(error){
            res.status(500).json("Internal Server Error");
        }
    }

    

}