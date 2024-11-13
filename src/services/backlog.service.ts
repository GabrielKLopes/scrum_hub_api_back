import { AppDataSource } from "../data-source";
import { BackLog } from "../entities/Backlog.entity";
import { Project } from "../entities/Project.entity";
import { User } from "../entities/User.entity";


export class BacklogService{
    private userRepository = AppDataSource.getRepository(User);
    private backlogRepository = AppDataSource.getRepository(BackLog);
    private projectRepository = AppDataSource.getRepository(Project);

    async createBacklog(name: string, user_id: number, project_id: number): Promise<BackLog> {
        const create_by = await this.userRepository.findOne({ where: { user_id } });
        const project = await this.projectRepository.findOne({ where: { project_id } });

        if (!create_by) {
            throw new Error("User not found");
        }
        if (!project) {
            throw new Error("Project not found");
        }

        const backlog = this.backlogRepository.create({
            name,
            create_by,
            project,
        });
        return this.backlogRepository.save(backlog);
    }

    async getBacklog(backlog_id: number): Promise<BackLog> {
        const backlog = await this.backlogRepository.findOne({
            where: { backlog_id },
            relations: ['create_by', 'project']
        });

        if (!backlog) {
            throw new Error("BackLog not found");
        }

        return backlog;
    }

    async getAllBackLogsByProject(project_id: number): Promise<BackLog[]> {
        return this.backlogRepository.find({
            where: { project: { project_id } },
            relations: ['create_by', 'project']
        });
    }

    async getAllBackLog(): Promise<BackLog[]>{
        const backlog = await this.backlogRepository.find({relations: ['create_by']});

        if(!backlog){
            throw new Error("No backlogs found");
        }

        return backlog;
    }

    async updateBacklog(backlog_id:number,  name: string): Promise<BackLog>{
        const backlogRepository = AppDataSource.getRepository(BackLog);
        const updateBacklog = await this.backlogRepository.findOne({where: {backlog_id}, relations:['create_by']});

        if(!updateBacklog){
            throw new Error("Backlog not found");
        }

        updateBacklog.name = name !== undefined ? name: updateBacklog.name;

        await backlogRepository.save(updateBacklog);

        return updateBacklog;
    }

    async deleteBacklog(backlog_id: number): Promise<void>{
        const backlogId = await this.backlogRepository.findOne({where: {backlog_id}});
        if(!backlogId){
            throw new Error("Backlog not found");
        }

        await this.backlogRepository.delete(backlog_id);
    }

}