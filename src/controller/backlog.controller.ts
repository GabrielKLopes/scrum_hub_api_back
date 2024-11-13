import { Request, Response } from "express";
import { BacklogService } from "../services/backlog.service";

export class BacklogController{

    static async createBacklog(req: Request, res: Response) {
        try {
            const backlogService = new BacklogService();
            const { name, project_id } = req.body;
            const user_id: number = (req as any).user_id;

            const backlog = await backlogService.createBacklog(name, user_id, project_id);
            res.status(201).json(backlog);
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async getBacklogById(req: Request, res: Response) {
        try {
            const backlogService = new BacklogService();
            const backlog_id = parseInt(req.params.backlog_id, 10);

            const backlog = await backlogService.getBacklog(backlog_id);
            res.status(200).json(backlog);
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async getAllBacklogsByProject(req: Request, res: Response) {
        try {
            const backlogService = new BacklogService();
            const project_id = parseInt(req.params.project_id, 10);

            const backlogs = await backlogService.getAllBackLogsByProject(project_id);
            res.status(200).json(backlogs);
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    

    static async getAllBacklog(req: Request, res: Response){
        try{
            const backlogService = new BacklogService();
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                res.status(400).json({ message: 'Token not provider' })
                return;
            }

            const backlog = await backlogService.getAllBackLog();
            res.status(201).json(backlog);

        }catch(error){
           res.status(500).json("Internal Server Error"); 
        }
    }

    static async updadeBacklog(req: Request, res: Response){
       try{
        const backlogService = new BacklogService();
        const backlog_id = parseInt(req.params.backlog_id, 10);
        const {name} = req.body;

            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                res.status(400).json({ message: 'Token not provider' })
                return;
            }
            if(!backlog_id){
                res.status(400).json({message: 'Backlog not found'});
                return;
            }

            const backlog = await backlogService.updateBacklog(backlog_id, name);
            res.status(201).json(backlog);
       }catch(error){
        
            res.status(500).json("Interal Server Error");
           
       }
    }

    static async deleteBacklog(req: Request, res: Response){
        try{
            const backLogService = new BacklogService();
            const backlog_id = parseInt(req.params.backlog_id, 10);
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                res.status(400).json({ message: 'Token not provider' })
                return;
            }
            if(!backlog_id){
                res.status(400).json({message: 'Backlog not found'});
                return;
            }

            const backlog = await backLogService.deleteBacklog(backlog_id);
            res.status(200).json(backlog);
        }catch(error){
           
            res.status(500).json("Internal Server Error");
        }
    }

}