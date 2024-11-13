import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Project } from "./Project.entity"; 
import { Sprint } from "./Sprint.entity";
import { Task } from "./Task.entity";
import { User } from "./User.entity";

@Entity('backlogs')
export class BackLog {
    @PrimaryGeneratedColumn()
    backlog_id: number;

    @Column()
    name: string;

    @ManyToOne(() => User, user => user.user_id)
    @JoinColumn({ name: 'create_by' })
    create_by: User;

    @OneToMany(() => Sprint, sprint => sprint.backlog)
    sprint: Sprint[];

    @OneToMany(() => Task, task => task.backlog)
    task: Task[];

    @ManyToOne(() => Project, project => project.backlog) 
    @JoinColumn({ name: 'project_id' })
    project: Project;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
