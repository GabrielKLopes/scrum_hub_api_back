import { User } from "../entities/User.entity";
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AppDataSource } from "../data-source";
import { PermissionUser } from "../entities/PermissionUser.entity";
import { Permission } from "../entities/Permission.entity";
import { Title } from "../entities/Title.entity";
import { Squad } from "../entities/Squad.entity";



export class UserService{
    private userRepository = AppDataSource.getRepository(User);
    private permissionUserRepository = AppDataSource.getRepository(PermissionUser);
    private permissionRepository = AppDataSource.getRepository(Permission);
    private titleRepository = AppDataSource.getRepository(Title);
    private squadRepository = AppDataSource.getRepository(Squad);

    async createUser(name: string, email: string, password: string, title_id?:number , permissionUser_id?: number,
        permission_id?: number, squad_id?: number ): Promise<User>{
            try{
                const existingEmail = await this.userRepository.findOne({ where: { email } });
               
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    throw new Error('Email invalid');
                }
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
                if (!passwordRegex.test(password)) {
                    throw new Error('The password must be between 8 and 16 characters long, containing at least one saved letter, one lowercase letter, one number and one special character.');
                }
                if (existingEmail) {
                    throw new Error('E-mail already registered');
                }

                const hashPassword = await bcrypt.hash(password, 10);
                const user = new User();
                user.name = name;
                user.email = email;
                user.password = hashPassword;
               

                if (title_id) {
                    const title = await this.titleRepository.findOne({where:{title_id}});
                    if (title) {
                        user.title = title;
                    }
                }
                if (permissionUser_id) {
                    const permissionUser = await this.permissionUserRepository.findOne({where:{permissionUser_id}});
                    if (permissionUser) {
                        user.permissionUser = permissionUser;
                    }
                }

                const permission = await this.permissionRepository.findOne({where:{permission_id}});
                if (permission) {
                    user.permission = permission;
                }

                if (squad_id) {
                    const squad = await this.squadRepository.findOne({where:{squad_id}});
                    if (squad) {
                        user.squad = squad;
                    }
                }
                await this.userRepository.save(user);
                return user;
           
            }catch (error) {
                throw error;
        }


}
    async getAllUser(): Promise<User[]>{
        const users = await this.userRepository.find({
            relations: ['permission', 'permissionUser'],  
          });
        return users;
    }

    async getUserById(user_id: number): Promise<User | undefined>{
        try{
            const users = await this.userRepository.findOne({where:{user_id}, relations:['permission', 'permissionUser']});
            if(!users){
                throw new Error('User not found');
            }
            return users;
        }catch(error){
 
            throw new Error('Internal server error');
        }
    }

    async updatedUser(user_id: number, name: string, email: string, password: string, title_id?: number, permission_id?:number, permissionUser_id?:number, squad_id?: number): Promise<User>{
        const userRepository = AppDataSource.getRepository(User);

        const existingEmail = await this.userRepository.findOne({where:{email}, relations:['permission', 'permissionUser']});
        if(existingEmail && existingEmail.user_id !== user_id){
            throw new Error('E-mail already registered');
        }

        const updateUser = await this.userRepository.findOne({where: {user_id}, relations:['permission', 'permissionUser']});

        if(!updateUser){
            throw new Error('User not found');
        }

        updateUser.name = name !== undefined ? name: updateUser.name;
        updateUser.email = email !== undefined ? email : updateUser.email;

        if (password !== undefined && password !== '') {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
            if (!passwordRegex.test(password)) {
                throw new Error('The password must be between 8 and 16 characters long, containing at least one saved letter, one lowercase letter, one number and one special character.');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            updateUser.password = hashedPassword;
        }

        if(permissionUser_id !== undefined){
            const permissionUser = await this.permissionUserRepository.findOne({where:{permissionUser_id}});
            if(!permissionUser){
                throw new Error('PermissionUser not found');
            }
            updateUser.permissionUser = permissionUser;
        }
        if(permission_id !== undefined){
        const permission = await this.permissionRepository.findOne({where:{permission_id}});
            if(!permission){
                throw new Error('Permission not found');
            }
            updateUser.permission = permission;
        }

        if(squad_id !== undefined){
            const squad = await this.squadRepository.findOne({where:{squad_id}});
            if(!squad){
                throw new Error('Squad not found');
            }
            updateUser.squad = squad;
        }

        if(title_id !== undefined){
            const title = await this.titleRepository.findOne({where: {title_id}});
            if(!title){
                throw new Error('Title not found');
            }
            updateUser.title = title;
        }

        await userRepository.save(updateUser);
        return updateUser;
    }

    async deleteUser(user_id: number): Promise<void>{
        const userId = await this.userRepository.findOne({where: {user_id}});

        if(!userId){
            throw new Error('User not found');
        }
        await this.userRepository.delete(user_id);
    }
}