import { Request, Response } from "express";
import { SquadService } from "../services/Squad.service";


export class SquadController {

    static async createSquad(req: Request, res: Response): Promise<void> {
        try {
            const squadService = new SquadService();
            const { name } = req.body;
            const user_id = (req as any).user_id;

            const token = req.headers.authorization?.split(" ")[1];

            if (!token) {
                res.status(400).json({ message: 'Token not provider' })
                return;
            }

            if (!user_id) {
                res.status(400).json({ message: 'Acess denied' })
                return;
            }
            const squad = await squadService.createSquad(name, user_id);
            res.status(201).json(squad);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getAllSquad(req: Request, res: Response): Promise<void> {
        try {
            const squadService = new SquadService();

            const token = req.headers.authorization?.split(" ")[1];

            if (!token) {
                res.status(400).json({ message: 'Token not provider' })
                return;
            }

            const squad = await squadService.getAllSquads();
            res.status(200).json(squad);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getSquadById(req: Request, res: Response): Promise<void> {
        try {
            const squadService = new SquadService();
            const squad_id = parseInt(req.params.squad_id, 10);
            const token = req.headers.authorization?.split(" ")[1];

            if (!token) {
                res.status(400).json({ message: 'Token not provider' })
                return;
            }

            if (!squad_id) {
                res.status(400).json({ message: 'Squad not found' });
                return;
            }
            const squad = await squadService.getSquadById(squad_id);

            res.status(200).json(squad);

        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async updateSquad(req: Request, res: Response): Promise<void> {
        try {
            const squadService = new SquadService();
            const squad_id = parseInt(req.params.squad_id, 10);
            const token = req.headers.authorization?.split(" ")[1];
            const { name } = req.body;

            if (!token) {
                res.status(400).json({ message: 'Token not provider' })
                return;
            }

            if (!squad_id) {
                res.status(400).json({ message: 'Squad not found' });
                return;
            }

            const squad = await squadService.updateSquad(squad_id, name);
            res.status(200).json(squad);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async deleteSquad(req: Request, res: Response): Promise<void> {
        try {
            const squadService = new SquadService();
            const squad_id = parseInt(req.params.squad_id, 10);
            const token = req.headers.authorization?.split(" ")[1];

            if (!token) {
                res.status(400).json({ message: 'Token not provider' })
                return;
            }

            if (!squad_id) {
                res.status(400).json({ message: 'Squad not found' });
                return;
            }

            const squad = await squadService.deleteSquad(squad_id);
            res.status(200).json(squad);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    static async getMembersBySquad(req: Request, res: Response) {
        try {
            const squadService = new SquadService();
            const { squad_id } = req.params;

            const members = await squadService.getMembersBySquadId(parseInt(squad_id));
            return res.json(members);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' })
        }
    }
}