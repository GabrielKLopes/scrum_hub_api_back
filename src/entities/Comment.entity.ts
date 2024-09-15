import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Task } from "./Task.entity";
import { SubTask } from "./SubTask.entity";
import { User } from "./User.entity";


@Entity('comments')

export class Comment{
    @PrimaryGeneratedColumn()
    comment_id: number;

    @Column()
    description: string;

    @ManyToOne(() => User, user => user.user_id)
    @JoinColumn({name: 'create_by'})
    create_by: User;

    @ManyToOne(() => Task, task => task.task_id)
    @JoinColumn({name: 'task_id'})
    task: Task;

    @ManyToOne(() => SubTask, subtask => subtask.subtask_id)
    @JoinColumn({name: 'subtask_id'})
    subtask: SubTask;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}