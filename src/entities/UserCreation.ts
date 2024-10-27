import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity"; // Importe a entidade User
import { PermissionUser } from "./PermissionUser.entity"; // Importe a entidade PermissionUser
import { Permission } from "./Permission.entity"; // Importe a entidade Permission
import { Squad } from "./Squad.entity"; // Importe a entidade Squad

@Entity('user_created')
export class UserCreation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string; 

    @Column()
    password: string; 

    @ManyToOne(() => User, user => user.createdUsers) 
    creator: User | null;

    @ManyToOne(() => PermissionUser, permissionUser => permissionUser.permissionUser_id, { nullable: true }) // Permitir null
    permissionUser: PermissionUser | null; 

    @ManyToOne(() => Permission, permission => permission.permission_id, { nullable: true }) // Permitir null
    permission: Permission | null; 

    @ManyToOne(() => Squad, squad => squad.squad_id, { nullable: true }) // Permitir null
    @JoinColumn({ name: 'squad_id' })
    squad: Squad | null;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
