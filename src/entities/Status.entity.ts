import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Task } from "./Task.entity";
import { SubTask } from "./SubTask.entity";


@Entity('status')

export class Status{
    
    @PrimaryGeneratedColumn()
    status_id: number

    @Column()
    name: string;

    @OneToMany(() => Task, task => task.status)
    task: Task[];

    @OneToMany(() => SubTask, subtask => subtask.status)
    subtask: SubTask[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}