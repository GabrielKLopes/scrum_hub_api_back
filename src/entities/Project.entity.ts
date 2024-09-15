import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Squad } from "./Squad.entity";
import { Task } from "./Task.entity";
import { User } from "./User.entity";


@Entity('projects')

export class Project{
    @PrimaryGeneratedColumn()
    project_id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => Squad, squad => squad.squad_id)
    @JoinColumn({name: 'squad_id'})
    squad: Squad

    @ManyToOne(() => User, user => user.projects)
    @JoinColumn({ name: 'user_id' }) 
    createdBy: User;

    @OneToMany(() => Task, task => task.project)
    task: Task[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}

