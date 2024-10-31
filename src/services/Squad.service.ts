import { AppDataSource } from "../data-source";
import { Squad } from "../entities/Squad.entity";
import { User } from "../entities/User.entity";


export class SquadService{
    private userRepository = AppDataSource.getRepository(User);
    private squadRepository  = AppDataSource.getRepository(Squad);

    async createSquad(name: string, user_id: number): Promise<Squad>{
        try{
            const createdBy = await this.userRepository.findOne({where:{user_id}, relations:['permissionUser'], select:['user_id', 'name']});

            if(!createdBy){
                throw new Error('User not found');
            }
            const squad = this.squadRepository.create({
                name,
                createdBy
            })
            const savedSquad = await this.squadRepository.save(squad);

            return savedSquad;

        }catch(error){
            throw new Error('Internal server error');
        }
    }

    async getAllSquad(): Promise<Squad[]>{
    const squad = await this.squadRepository.find();

    return squad;
    }

    async getSquadById(squad_id: number): Promise<Squad | undefined>{
       try{
        const squad = await this.squadRepository.findOne({where: {squad_id}});
        if(!squad){
            throw new Error('Squad not found');
        }
        return squad;

       }catch(error){
            throw new Error('Internal Server Error');
       }
    }
    async updateSquad(squad_id: number, name: string): Promise<Squad>{
        const squadRepository = AppDataSource.getRepository(Squad);
        const updateSquad = await this.squadRepository.findOne({where:{squad_id}});

        if(!updateSquad){
            throw new Error('Squad not found');
        }
        const existingSquad = await squadRepository.findOne({where: {name}});
        if(existingSquad){
            throw new Error('Squad name already exist');
        }

        if(name == undefined || name == ""){
            throw new Error("Squad null or undefined")
        }else if(name !== undefined && name !== ""){
            updateSquad.name = name;
        }

        await squadRepository.save(updateSquad);
        return updateSquad;
       
    }

    async deleteSquad(squad_id: number): Promise<void>{
        const squadId = await this.squadRepository.findOne({where: {squad_id}});

        if(!squadId){
            throw new Error('Squad not found');
        }
        await this.squadRepository.delete(squad_id);
    }

}