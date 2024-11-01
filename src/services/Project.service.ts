import { AppDataSource } from "../data-source";
import { Project } from "../entities/Project.entity";
import { Squad } from "../entities/Squad.entity";
import { User } from "../entities/User.entity";


export class ProjectService{
    private userRepository = AppDataSource.getRepository(User);
    private squadRepository = AppDataSource.getRepository(Squad);
    private projectRepository = AppDataSource.getRepository(Project);

    async createProject( name:string, description:string, squad_id: number, user_id: number): Promise<Project>{
        const createdBy = await this.userRepository.findOne({where:{user_id}, relations:['permissionUser']});
        const squad = await this.squadRepository.findOne({where:{squad_id}});
        if(!createdBy){
            throw new Error('User not found');
        }

        if(!squad){
            throw new Error('Squad not found');
        }

        const project = this.projectRepository.create({
            name,
            description,
            createdBy,
            squad
        })
        return this.projectRepository.save(project);
    }

    async getAllProject():Promise<Project[]>{
        const project = await this.projectRepository.find({relations: ['createdBy', 'squad']});
        return project;
    }

    async getProjectById(project_id: number):Promise<Project | undefined>{
        const project = await this.projectRepository.findOne({where: {project_id}, relations:['createdBy', 'squad']});
        if(!project){
            throw new Error('project not found');
        }
        return project;
    }

    async updateProject(project_id: number, name: string, description: string, squad_id: number): Promise<Project>{
        const projectRepository = AppDataSource.getRepository(Project);
        const updateProject = await this.projectRepository.findOne({where: {project_id}, relations: ['createdBy', 'squad']});

        if(!updateProject){
            throw new Error("Project not found");
        }
        updateProject.name = name !== undefined ? name: updateProject.name;
        updateProject.description = description !== undefined ? description: updateProject.description;

        if(squad_id !== undefined){
            const squad = await this.squadRepository.findOne({where:{squad_id}});
            if(!squad){
                throw new Error('Squad not found');
            }
            updateProject.squad = squad;
        }
        await projectRepository.save(updateProject);
        return updateProject;
    }

    async deleteProject(project_id: number): Promise<void>{
        const projectId = await this.projectRepository.findOne({where: {project_id}});

        if(!projectId){
            throw new Error("Project not found");
        }
        await this.projectRepository.delete(project_id);
    }

}