import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Task } from "./Task.entity";
import { Status } from "./Status.entity";
import { Priority } from "./Priority.entity";
import { User } from "./User.entity";
import { Squad } from "./Squad.entity";
import { Sprint } from "./Sprint.entity";
import { Comment } from "./Comment.entity";


@Entity('subtask')

export class SubTask{
    @PrimaryGeneratedColumn()
    subtask_id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(()=> User, user => user.user_id)
    @JoinColumn({name: 'create_by'})
    create_by: User;

    @ManyToOne(() => User, user => user.user_id)
    @JoinColumn({name: 'responsible_by'})
    responsible_by: User

    @ManyToOne(() => Task, task => task.task_id)
    @JoinColumn({name: 'task_id'})
    task: Task;

    @ManyToOne(() => Status, status => status.status_id)
    @JoinColumn({name: 'status_id'})
    status: Status

    @ManyToOne(() => Priority, priority => priority.priority_id)
    @JoinColumn({name: 'priority_id'})
    priority: Priority

    @ManyToOne(() => Squad, squad => squad.squad_id)
    @JoinColumn({name: 'squad_id'})
    squad: Squad;

    @ManyToOne(() => Sprint, sprint => sprint.sprint_id)
    @JoinColumn({name: 'sprint_id'})
    sprint: Sprint;

    @OneToMany(() => Comment, comment => comment.subtask)
    comment: Comment[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}