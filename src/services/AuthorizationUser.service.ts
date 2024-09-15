import { AppDataSource } from "../data-source"
import { User } from "../entities/User.entity"
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class AuthorizationUser{
    private userRepository = AppDataSource.getRepository(User)
    private secretJWT = process.env.JWT_SECRET_KEY || "";

    async authorizationUser(email: string, password: string){
        try{
            const user = await this.userRepository.findOne({where:{email}, relations: ['permission', 'permissionUser']});

            if(!user){
                throw new Error('User not found');
            }
            const passwordMatch = await bcrypt.compare(password, user.password);

            if(passwordMatch){
                const payload = {
                    email: user.email,
                    user_id: user.user_id,
                    username: user.name,
                    permission: user.permission,
                    permissionUser: user.permissionUser
                };

                return jwt.sign(payload, this.secretJWT, {expiresIn: '1h'});
            }
            throw new Error('User ou password incorrect');
        }catch(error){
            throw error;
        }
    }
}