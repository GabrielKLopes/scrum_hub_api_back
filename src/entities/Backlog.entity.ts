import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";
import { Sprint } from "./Sprint.entity";
import { Task } from "./Task.entity";


@Entity('backlogs')

export class BackLog{

    @PrimaryGeneratedColumn()
    backlog_id:number;

    @Column()
    name: string;
    
    @ManyToOne(() => User, user => user.user_id)
    @JoinColumn({name: 'create_by'})
    create_by: User;
    
    @OneToMany(() => Sprint, sprint => sprint.backlog)
    sprint: Sprint[];

    @OneToMany(() => Task, task => task.backlog)
    task: Task[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}