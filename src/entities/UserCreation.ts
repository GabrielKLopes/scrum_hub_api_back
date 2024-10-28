import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity"; 
import { PermissionUser } from "./PermissionUser.entity"; 
import { Permission } from "./Permission.entity"; 
import { Squad } from "./Squad.entity"; 

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

    @ManyToOne(() => PermissionUser, permissionUser => permissionUser.permissionUser_id, { nullable: true }) 
    permissionUser: PermissionUser | null; 

    @ManyToOne(() => Permission, permission => permission.permission_id, { nullable: true })
    permission: Permission | null; 

    @ManyToOne(() => Squad, squad => squad.squad_id, { nullable: true }) 
    @JoinColumn({ name: 'squad_id' })
    squad: Squad | null;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
