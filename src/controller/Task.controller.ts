import { Request, Response } from "express";
import { TaskService } from "../services/task.service";

export class TaskController {
    static async createTask(req: Request, res: Response): Promise<void> {
        const taskService = new TaskService
        try {
            const { name, description, priority_id, status_id } = req.body;
            const { project_id } = req.params;
            const user_id = (req as any).user_id;

            const task = await taskService.createTask(
                name,
                description,
                parseInt(project_id, 10),
                user_id,
                priority_id,
                status_id
            );
            res.status(201).json(task);
        } catch (error) {
            res.status(500).json({ message: "Erro ao criar tarefa" });
        }
    }

    static async getTasksByProject(req: Request, res: Response): Promise<void> {
        const taskService = new TaskService
        try {
            const { project_id } = req.params;
            const tasks = await taskService.getTasksByProject(parseInt(project_id, 10));
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar tarefas do projeto" });
        }
    }

    static async updateTask(req: Request, res: Response): Promise<void> {
        const taskService = new TaskService

        try {
            const { task_id } = req.params;
            const { name, description, status_id } = req.body;

            const updatedTask = await taskService.updateTask(
                parseInt(task_id, 10),
                name,
                description,
                status_id
            );
            res.status(200).json(updatedTask);
        } catch (error) {
            res.status(500).json({ message: "Erro ao atualizar tarefa" });
        }
    }

    static async deleteTask(req: Request, res: Response): Promise<void> {
        const taskService = new TaskService

        try {
            const { task_id } = req.params;
            await taskService.deleteTask(parseInt(task_id, 10));
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: "Erro ao deletar tarefa" });
        }
    }

    static async getAllTasks(req: Request, res: Response): Promise<void> {

        const taskService = new TaskService
        try {
            const tasks = await taskService.getAllTasks();
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar todas as tarefas" });
        }
    }

    static async getTaskById(req: Request, res: Response): Promise<void> {
        const taskService = new TaskService

        try {
            const { task_id } = req.params;
            const task = await taskService.getTaskById(parseInt(task_id, 10));
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar tarefa" });
        }
    }

    static async getTaskByBacklog(req: Request, res: Response): Promise<void> {
        const taskService = new TaskService();
    
        try {
          const { backlog_id } = req.params;
    
          if (!backlog_id) {
            res.status(400).json({ message: "Backlog ID é necessário" });
            return;
          }
    
          const tasks = await taskService.getTaskByBacklog(parseInt(backlog_id, 10));
    
          if (tasks.length === 0) {
            res.status(404).json({ message: "Nenhuma tarefa encontrada para este backlog" });
            return;
          }
    
          res.status(200).json(tasks);
        } catch (error) {
          res.status(500).json({ message: "Erro ao buscar tarefas do backlog" });
        }
      }
}
