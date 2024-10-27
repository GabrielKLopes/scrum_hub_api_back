import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Permission } from "./Permission.entity";
import { Squad } from "./Squad.entity";
import { PermissionUser } from "./PermissionUser.entity";
import { Sprint } from "./Sprint.entity";
import { BackLog } from "./Backlog.entity";
import { Task } from "./Task.entity";
import { SubTask } from "./SubTask.entity";
import { Comment } from "./Comment.entity";
import { Project } from "./Project.entity";
import { UserCreation } from "./UserCreation";



@Entity('users')

export class User{
    @PrimaryGeneratedColumn()
    user_id:number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password:string;

    @ManyToOne(() => PermissionUser, permissionUser => permissionUser.permissionUser_id)
    @JoinColumn({name: 'permissionUser_id'})
    permissionUser: PermissionUser;

    @ManyToOne(() => Permission, permission => permission.permission_id)
    @JoinColumn({name: 'permission_id'})
    permission: Permission;

    @ManyToOne(() => Squad, squad => squad.squad_id)
    @JoinColumn({name: 'squad_id'})
    squad: Squad;

    @OneToMany(() => Squad, squad => squad.createdBy)
    squads: Squad[];

    @OneToMany(() => Project, project => project.createdBy)
    projects: Project[];

    @OneToMany(()=> Sprint, sprint => sprint.create_by)
    sprint: Sprint[];

    @OneToMany(() => BackLog, backlog => backlog.create_by)
    backlog: BackLog[]

    @OneToMany(() => Task, task => task.create_by)
    create_by_task: Task[];

    @OneToMany(() => Task, task => task.responsible_by)
    responsible_by_task: Task[];

    @OneToMany(() => SubTask, subtask => subtask.create_by)
    create_by: SubTask[];

    @OneToMany(() => SubTask, subtask => subtask.responsible_by)
    responsible_by: SubTask[];

    @OneToMany(() => Comment, comment => comment.create_by)
    comment: Comment[];

    @OneToMany(() => UserCreation, userCreation => userCreation.creator)
    createdUsers: UserCreation[];

  
 

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

}