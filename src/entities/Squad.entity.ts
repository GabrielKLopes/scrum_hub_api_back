import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";
import { Project } from "./Project.entity";
import { Sprint } from "./Sprint.entity";
import { Task } from "./Task.entity";
import { SubTask } from "./SubTask.entity";



@Entity('squads')

export class Squad{

    @PrimaryGeneratedColumn()
    squad_id: number;

    @Column()
    name: string;

    @Column({ nullable: true }) 
    user_id: number;

    @ManyToOne(() => User, user => user.squads)
    @JoinColumn({ name: 'user_id' }) 
    createdBy: User;

    @OneToMany(() => Sprint, sprint => sprint.squad)
    sprint: Sprint[];

    @OneToMany(() => Project, project => project.squad)
    project: Project[];

    @OneToMany(() => Task, task => task.squad)
    task: Task[];
   
    @OneToMany(()=> User, user => user.squad)
    user: User[];

    @OneToMany(() => SubTask, substask => substask.squad)
    substask: SubTask[];

    
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

}