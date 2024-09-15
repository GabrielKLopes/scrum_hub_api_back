import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Squad } from "./Squad.entity";
import { User } from "./User.entity";
import { BackLog } from "./Backlog.entity";
import { Task } from "./Task.entity";
import { SubTask } from "./SubTask.entity";


@Entity('sprints')

export class Sprint{

    @PrimaryGeneratedColumn()
    sprint_id: number;

    @Column()
    name: string;

    @ManyToOne(() => Squad, squad => squad.squad_id)
    @JoinColumn({name: 'squad_id'})
    squad: Squad;
    
    @ManyToOne(() => User, user => user.user_id)
    @JoinColumn({name: 'create_by'})
    create_by: User

    @ManyToOne(() => BackLog, backlog => backlog.backlog_id)
    @JoinColumn({name: 'backlog_id'})
    backlog: BackLog;

    @OneToMany(() => Task, task => task.sprint)
    task: Task[];

    @OneToMany(() => SubTask, subtask => subtask.sprint)
    subtask: SubTask[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;


}