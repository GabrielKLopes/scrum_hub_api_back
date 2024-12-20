import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";
import { Project } from "./Project.entity";
import { Sprint } from "./Sprint.entity";
import { Task } from "./Task.entity";
import { SubTask } from "./SubTask.entity";
import { UserCreation } from "./UserCreation";

@Entity('squads')
export class Squad {

    @PrimaryGeneratedColumn()
    squad_id: number;

    @Column()
    name: string;

    @Column({ nullable: true }) 
    user_id: number;

    @ManyToOne(() => User, user => user.squads) // Relaciona a squad ao usuário que a criou
    @JoinColumn({ name: 'user_id' }) 
    createdBy: User;

    @OneToMany(() => Sprint, sprint => sprint.squad)
    sprints: Sprint[];

    @OneToMany(() => Project, project => project.squad)
    projects: Project[];

    @OneToMany(() => Task, task => task.squad)
    tasks: Task[];

    @OneToMany(() => User, user => user.squad)
    users: User[]; 

    @OneToMany(() => UserCreation, userCreation => userCreation.squad)
    userCreations: UserCreation[];

    @OneToMany(() => SubTask, subtask => subtask.squad)
    subtasks: SubTask[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
