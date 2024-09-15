import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";

@Entity('permissionusers')
export class PermissionUser {
    @PrimaryGeneratedColumn()
    permissionUser_id: number;

    @Column()
    name: string;

    @Column({ name: 'createvalue', default: false })
    createValue: boolean;

    @Column({ name: 'deletevalue', default: false })
    deleteValue: boolean;

    @OneToMany(() => User, user => user.permissionUser)
    users: User[];

    @Column({ name: 'updatevalue', default: false })
    updateValue: boolean;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
