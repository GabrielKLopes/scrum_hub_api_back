import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";
import { UserCreation } from "./UserCreation";


@Entity('permissions')

export class Permission{
        @PrimaryGeneratedColumn()
        permission_id: number;

        @Column()
        name: string;

        @Column({default: false})
        type:boolean;

        @OneToMany(() => User, user => user.permission)
        user: User[];

        @OneToMany(() => UserCreation, userCreation => userCreation.permission)
        userCreation: UserCreation[];

        @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
        created_at: Date;
    
        @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
        updated_at: Date;
    


}