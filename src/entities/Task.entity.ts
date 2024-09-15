import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Project } from "./Project.entity";
import { Priority } from "./Priority.entity";
import { Status } from "./Status.entity";
import { SubTask } from "./SubTask.entity";
import { User } from "./User.entity";
import { Squad } from "./Squad.entity";
import { Sprint } from "./Sprint.entity";
import { Comment } from "./Comment.entity";
import { BackLog } from "./Backlog.entity";


@Entity('tasks')

export class Task{
    @PrimaryGeneratedColumn()
    task_id: number;

    @Column()
    name: string;
    
    @Column()
    description: string;

    @ManyToOne(() => User, user => user.user_id)
    @JoinColumn({name: 'create_by'})
    create_by: User;

    @ManyToOne(() => User, user => user.user_id)
    @JoinColumn({name: 'responsible_by'})
    responsible_by: User

    @ManyToOne(() => Project, project => project.project_id)
    @JoinColumn({name: 'project_id'})
    project: Project;

    @ManyToOne(() => Priority, priority => priority.priority_id)
    @JoinColumn({name: 'priority_id'})
    priority: Priority;

    @ManyToOne(() => Status, status => status.status_id)
    @JoinColumn({name: 'status_id'})
    status: Status;

    @ManyToOne(() => Squad, squad => squad.squad_id)
    @JoinColumn({name: 'squad_id'})
    squad: Squad;

    @ManyToOne(() => Sprint, sprint => sprint.sprint_id)
    @JoinColumn({name: 'sprint_id'})
    sprint: Sprint;

    @ManyToOne(() => BackLog, backlog => backlog.backlog_id)
    @JoinColumn({name: 'backlog_id'})
    backlog: BackLog;

    @OneToMany(() => SubTask, subtask => subtask.task)
    subtask: SubTask[];

    @OneToMany(() => Comment, comment => comment.task)
    comment: Comment[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}