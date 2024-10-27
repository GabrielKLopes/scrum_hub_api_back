import { User } from "../entities/User.entity";
import { AppDataSource } from "../data-source";
import { PermissionUser } from "../entities/PermissionUser.entity";
import { Permission } from "../entities/Permission.entity";
import { Squad } from "../entities/Squad.entity";
import bcrypt from 'bcrypt';
import { UserCreation } from "../entities/UserCreation";
import { UserCreateDTO } from "../dto/UserCreateDTO";
import { UserResponseDTO } from "../dto/UserResponseDTO";

export class UserCreationService {
    private userCreatedRepository = AppDataSource.getRepository(UserCreation);
    private userRepository = AppDataSource.getRepository(User);
    private permissionUserRepository = AppDataSource.getRepository(PermissionUser);
    private permissionRepository = AppDataSource.getRepository(Permission);
    private squadRepository = AppDataSource.getRepository(Squad);

    async createUser(
        creatorId: number,
        { 
            name, 
            email, 
            password, 
            permissionUser_id, 
            permission_id, 
            squad_id 
        }: UserCreateDTO
    ): Promise<UserResponseDTO> {
        const creator = await this.userRepository.findOne({ where: { user_id: creatorId } });

        const existingEmail = await this.userCreatedRepository.findOne({ where: { email } });
        if (existingEmail) {
            throw new Error('E-mail já cadastrado.');
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const permissionUser = permissionUser_id 
            ? await this.permissionUserRepository.findOne({ where: { permissionUser_id } }) 
            : null;

        const permission = permission_id 
            ? await this.permissionRepository.findOne({ where: { permission_id } }) 
            : null;

        const squad = squad_id 
            ? await this.squadRepository.findOne({ where: { squad_id } }) 
            : null;

        if (permissionUser_id && !permissionUser) {
            throw new Error('Permissão de usuário não encontrada.');
        }

        if (permission_id && !permission) {
            throw new Error('Permissão não encontrada.');
        }

        if (squad_id && !squad) {
            throw new Error('Squad não encontrado.');
        }

        const newUserCreated = new UserCreation();
        newUserCreated.name = name;
        newUserCreated.email = email;
        newUserCreated.password = hashPassword;
        newUserCreated.creator = creator; 
        newUserCreated.permissionUser = permissionUser; 
        newUserCreated.permission = permission;
        newUserCreated.squad = squad; 

        await this.userCreatedRepository.save(newUserCreated);

        return {
            id: newUserCreated.id,
            name: newUserCreated.name,
            email: newUserCreated.email,
            creator: creator ? { 
                user_id: creator.user_id,
                name: creator.name,
                email: creator.email,
            } : {
                user_id: -1,
                name: 'Criador Desconhecido',
                email: 'desconhecido@exemplo.com',
            },
            permissionUser: permissionUser ? {
                permissionUser_id: permissionUser.permissionUser_id,
                name: permissionUser.name,
                createValue: permissionUser.createValue,
                deleteValue: permissionUser.deleteValue,
                updateValue: permissionUser.updateValue,
            } : {
                permissionUser_id: -1,
                name: 'Sem Permissão',
                createValue: false,
                deleteValue: false,
                updateValue: false,
            },
            permission: permission ? {
                permission_id: permission.permission_id,
                name: permission.name,
                type: permission.type,
            } : {
                permission_id: -1,
                name: 'Sem Permissão',
                type: false,
            },
            squad: squad ? {
                name: squad.name,
                squad_id: squad.squad_id,
            } : {
                name: 'Sem Squad',
                squad_id: -1,
            },
            created_at: newUserCreated.created_at.toISOString(), 
        };
    }

    async getUsersCreatedBy(creatorId: number): Promise<UserResponseDTO[]> {
        const users = await this.userCreatedRepository.find({
            where: { creator: { user_id: creatorId } }, 
            relations: ['creator', 'permissionUser', 'permission', 'squad'], 
        });
    
        return users.map(user => ({
            id: user.id, 
            name: user.name,
            email: user.email,
            creator: user.creator ? {
                user_id: user.creator.user_id,
                name: user.creator.name,
                email: user.creator.email,
            } : {
                user_id: -1,
                name: 'Criador Desconhecido',
                email: 'desconhecido@exemplo.com',
            },
            permissionUser: user.permissionUser ? {
                permissionUser_id: user.permissionUser.permissionUser_id,
                name: user.permissionUser.name,
                createValue: user.permissionUser.createValue,
                deleteValue: user.permissionUser.deleteValue,
                updateValue: user.permissionUser.updateValue,
            } : {
                permissionUser_id: -1,
                name: 'Permissão Desconhecida',
                createValue: false,
                deleteValue: false,
                updateValue: false,
            },
            permission: user.permission ? {
                permission_id: user.permission.permission_id,
                name: user.permission.name,
                type: user.permission.type,
            } : {
                permission_id: -1,
                name: 'Permissão Desconhecida',
                type: false,
            },
            squad: user.squad ? {
                name: user.squad.name,
                squad_id: user.squad.squad_id,
            } : {
                name: 'Squad Desconhecido',
                squad_id: -1,
            },
            created_at: user.created_at.toISOString(),
        }));
    }
}