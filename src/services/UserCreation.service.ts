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
        
        const existingUserInUser = await this.userRepository.findOne({ where: { email } });
        const existingUserInUserCreation = await this.userCreatedRepository.findOne({ where: { email } });
        
        if (existingUserInUser || existingUserInUserCreation) {
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
    
        const newUser = new User();
        newUser.name = name;
        newUser.email = email;
        newUser.password = hashPassword; 
        newUser.permissionUser = permissionUser; 
        newUser.permission = permission;
        newUser.squad = squad; 
    
        await this.userRepository.save(newUser);
    
        const newUserCreated = new UserCreation();
        newUserCreated.name = newUser.name;
        newUserCreated.email = newUser.email;
        newUserCreated.password = newUser.password; 
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
    
    

    async getAllUsers(): Promise<UserResponseDTO[]> {
    
        const allUsers = await this.userCreatedRepository.find({
            relations: ['creator', 'permissionUser', 'permission', 'squad'],
        });
    
    
        return allUsers.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at.toISOString(),
            creator: {
                user_id: user.creator?.user_id || 0,
                name: user.creator?.name || '',
                email: user.creator?.email || '',
            },
            permissionUser: {
                permissionUser_id: user.permissionUser?.permissionUser_id || 0,
                name: user.permissionUser?.name || '',
                createValue: user.permissionUser?.createValue || false,
                deleteValue: user.permissionUser?.deleteValue || false,
                updateValue: user.permissionUser?.updateValue || false,
            },
            permission: {
                permission_id: user.permission?.permission_id || 0,
                name: user.permission?.name || '',
                type: user.permission?.type || false,
            },
            squad: {
                name: user.squad?.name || '',
                squad_id: user.squad?.squad_id || 0,
            }
        }));
    }
    

    async deleteUser(userId: number): Promise<void> {
        const userToDelete = await this.userCreatedRepository.findOne({
            where: { id: userId },
            relations: ['creator'], 
        });
        
        if (!userToDelete) {
            throw new Error('Usuário não encontrado.');
        }
    
        const associatedUser = await this.userRepository.findOne({
            where: { email: userToDelete.email }, 
        });
    
        if (associatedUser) {
            await this.userRepository.remove(associatedUser);
        }
    
        await this.userCreatedRepository.remove(userToDelete);
    }
    

    async getUserById(userId: number): Promise<UserResponseDTO> {
        const user = await this.userCreatedRepository.findOne({
            where: { id: userId },
            relations: ['creator', 'permissionUser', 'permission', 'squad'],
        });
    
        if (!user) {
            throw new Error('Usuário não encontrado.');
        }
    
        return {
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
                name: 'Sem Permissão',
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
                name: 'Sem Permissão',
                type: false,
            },
            squad: user.squad ? {
                name: user.squad.name,
                squad_id: user.squad.squad_id,
            } : {
                name: 'Sem Squad',
                squad_id: -1,
            },
            created_at: user.created_at.toISOString(),
        };
    }
    async updateUser(
        userId: number,
        { name, email, password, permissionUser_id, permission_id, squad_id }: UserCreateDTO
    ): Promise<UserResponseDTO> {
        const userToUpdate = await this.userCreatedRepository.findOne({
            where: { id: userId },
            relations: ['creator', 'permissionUser', 'permission', 'squad'],
        });
    
        if (!userToUpdate) {
            throw new Error('Usuário não encontrado.');
        }
    
        const oldEmail = userToUpdate.email;
      
    
        const userInUser = await this.userRepository.findOne({
            where: { email: oldEmail },
            relations: ['permissionUser', 'permission', 'squad']
        });
    
        if (!userInUser) {
            throw new Error('Usuário associado não encontrado na tabela user.');
        }
    
        if (email && email !== oldEmail) {
            const existingUserWithNewEmail = await this.userRepository.findOne({ where: { email } });
            if (existingUserWithNewEmail) {
                throw new Error('E-mail já cadastrado na tabela user.');
            }
    
            const existingUserInUserCreated = await this.userCreatedRepository.findOne({ where: { email } });
            if (existingUserInUserCreated) {
                throw new Error('E-mail já cadastrado na tabela userCreated.');
            }
        }
    
        userToUpdate.name = name || userToUpdate.name;
        userToUpdate.email = email || userToUpdate.email;
    
        if (email && email !== oldEmail) {
            userInUser.email = email; 
        }
    
        if (password) {
            userToUpdate.password = await bcrypt.hash(password, 10);
            userInUser.password = userToUpdate.password; 
        }
    
        if (permissionUser_id) {
            const permissionUser = await this.permissionUserRepository.findOne({ where: { permissionUser_id } });
            if (!permissionUser) throw new Error('Permissão de usuário não encontrada.');
            userToUpdate.permissionUser = permissionUser;
            userInUser.permissionUser = permissionUser; 
        }
    
        if (permission_id) {
            const permission = await this.permissionRepository.findOne({ where: { permission_id } });
            if (!permission) throw new Error('Permissão não encontrada.');
            userToUpdate.permission = permission;
            userInUser.permission = permission;
        }
    
        if (squad_id) {
            const squad = await this.squadRepository.findOne({ where: { squad_id } });
            if (!squad) throw new Error('Squad não encontrado.');
            userToUpdate.squad = squad;
            userInUser.squad = squad;
        }
    
        await this.userCreatedRepository.save(userToUpdate);
        await this.userRepository.save(userInUser);
    
        const updatedUser = await this.userCreatedRepository.findOne({
            where: { id: userId },
            relations: ['creator', 'permissionUser', 'permission', 'squad'],
        });
    
        if (!updatedUser) {
            throw new Error('Erro ao buscar o usuário atualizado.');
        }
    
        return {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            created_at: updatedUser.created_at.toISOString(),
            creator: updatedUser?.creator ? {
                user_id: updatedUser.creator.user_id,
                name: updatedUser.creator.name,
                email: updatedUser.creator.email,
            } : { user_id: -1, name: 'Criador Desconhecido', email: 'desconhecido@exemplo.com' },
            permissionUser: updatedUser?.permissionUser ? {
                permissionUser_id: updatedUser.permissionUser.permissionUser_id,
                name: updatedUser.permissionUser.name,
                createValue: updatedUser.permissionUser.createValue,
                deleteValue: updatedUser.permissionUser.deleteValue,
                updateValue: updatedUser.permissionUser.updateValue,
            } : { permissionUser_id: -1, name: 'Sem Permissão', createValue: false, deleteValue: false, updateValue: false },
            permission: updatedUser?.permission ? {
                permission_id: updatedUser.permission.permission_id,
                name: updatedUser.permission.name,
                type: updatedUser.permission.type,
            } : { permission_id: -1, name: 'Sem Permissão', type: false },
            squad: updatedUser?.squad ? {
                name: updatedUser.squad.name,
                squad_id: updatedUser.squad.squad_id,
            } : { name: 'Sem Squad', squad_id: -1 }
        };
    }
    
    
    
    
    
}
