import { AppDataSource } from "../data-source";
import { Task } from "../entities/Task.entity";
import { Project } from "../entities/Project.entity";
import { User } from "../entities/User.entity";
import { Status } from "../entities/Status.entity";
import { Priority } from "../entities/Priority.entity";

export class TaskService {
 
    private taskRepository = AppDataSource.getRepository(Task);
    private projectRepository = AppDataSource.getRepository(Project);
    private userRepository = AppDataSource.getRepository(User);
    private statusRepository = AppDataSource.getRepository(Status);
    private priorityRepository = AppDataSource.getRepository(Priority);

    async createTask(name: string, description: string, project_id: number, create_by: number, priority_id: number, status_id: number): Promise<Task> {
        const project = await this.projectRepository.findOne({ where: { project_id } });
        const user = await this.userRepository.findOne({ where: { user_id: create_by } });
        const priority = await this.priorityRepository.findOne({ where: { priority_id } });
        const status = await this.statusRepository.findOne({ where: { status_id } });

        if (!project || !user || !priority || !status) {
            throw new Error("Project, User, Priority or Status not found");
        }

        const task = this.taskRepository.create({
            name,
            description,
            create_by: user,
            project,
            priority,
            status
        });

        return this.taskRepository.save(task);
    }

    async getTasksByProject(project_id: number): Promise<Task[]> {
        return this.taskRepository.find({ where: { project: { project_id } }, relations: ["project", "status", "priority"] });
    }
    async getTaskByBacklog(backlog_id: number): Promise<Task[]> {
        return this.taskRepository.find({
          where: { backlog: { backlog_id } },
          relations: ["project", "status", "priority", "create_by", "responsible_by"],
        });
      }
    async updateTask(task_id: number, name: string, description: string, status_id: number): Promise<Task> {
        const task = await this.taskRepository.findOne({ where: { task_id } });
        const status = await this.statusRepository.findOne({ where: { status_id } });

        if (!task || !status) {
            throw new Error("Task or Status not found");
        }

        task.name = name || task.name;
        task.description = description || task.description;
        task.status = status;

        return this.taskRepository.save(task);
    }

    async deleteTask(task_id: number): Promise<void> {
        await this.taskRepository.delete(task_id);
    }

    async getAllTasks(): Promise<Task[]> {
        return this.taskRepository.find({ relations: ["project", "status", "priority"] });
    }

    async getTaskById(task_id: number): Promise<Task | null> {
        const task = await this.taskRepository.findOne({
            where: { task_id },
            relations: ["project", "status", "priority", "create_by", "responsible_by"],
        });
        if (!task) {
            throw new Error("Tarefa não encontrada");
        }
        return task;
    }
}
