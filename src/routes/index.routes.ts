import { Router } from "express";

import { loginRoutes } from "./authentication.routes";
import UserController from "../controller/User.controller";
import { authorization } from "../middleware/authorization";
import { SquadController } from "../controller/Squad.controller";
import { ProjectController } from "../controller/Project.controller";
import { BacklogController } from "../controller/backlog.controller";
import { UserCreationController } from "../controller/userCreation.controller";
import { TaskController } from "../controller/Task.controller";

export const routes = Router();

//Login
routes.use("/session", loginRoutes)


// User Creation
routes.post("/session/user/create", authorization, UserCreationController.createUser); 
routes.get('/session/user/create', authorization, UserCreationController.getAllUsers);
routes.delete("/session/user/create/:user_id", authorization, UserCreationController.deleteUser); 
routes.get("/session/user/create/:user_id", authorization, UserCreationController.getUserById);
routes.put("/session/user/create/:user_id", authorization, UserCreationController.updateUser); 

//User
routes.post("/session/user/register", UserController.createUser);
routes.get("/session/user", authorization, UserController.getAllUsers);
routes.get("/session/user/:user_id", authorization, UserController.getUserById);
routes.put("/session/user/:user_id", authorization, UserController.updatedUser);
routes.delete("/session/user/:user_id", authorization, UserController.deleteUser);


//Squad
routes.post("/session/squad/createSquad", authorization, SquadController.createSquad);
routes.get("/session/squad", authorization, SquadController.getAllSquad);
routes.get("/session/squad/:squad_id", authorization, SquadController.getSquadById); 
routes.put("/session/squad/:squad_id", authorization, SquadController.updateSquad);
routes.delete("/session/squad/:squad_id", authorization, SquadController.deleteSquad);
routes.get('/session/:squad_id/members', authorization, SquadController.getMembersBySquad);

//Project
routes.post("/session/project/createProject", authorization, ProjectController.createProject);
routes.get("/session/project", authorization, ProjectController.getAllProjet);
routes.get("/session/project/:project_id", authorization, ProjectController.getProjectById);
routes.put("/session/project/:project_id", authorization, ProjectController.updateProject);
routes.delete("/session/project/:project_id", authorization, ProjectController.deleteProject);
routes.get("/session/project/squad/:squad_id", authorization, ProjectController.getProjectsBySquadId);



//BackLog
routes.post("/session/backlog/createBacklog", authorization, BacklogController.createBacklog);
routes.get("/session/backlog/:backlog_id", authorization, BacklogController.getBacklogById);
routes.get("/session/project/:project_id/backlogs", authorization, BacklogController.getAllBacklogsByProject);
routes.put("/session/backlog/:backlog_id", authorization, BacklogController.updadeBacklog);
routes.delete("/session/backlog/:backlog_id", authorization, BacklogController.deleteBacklog);


// Task Routes
routes.post("/session/project/:project_id/tasks", authorization, TaskController.createTask);
routes.get("/session/project/:project_id/tasks", authorization, TaskController.getTasksByProject);
routes.put("/session/tasks/:task_id", authorization, TaskController.updateTask);
routes.delete("/session/tasks/:task_id", authorization, TaskController.deleteTask);
routes.get("/session/tasks", authorization, TaskController.getAllTasks);
routes.get("/session/tasks/:task_id", authorization, TaskController.getTaskById);
routes.get("/session/backlog/:backlog_id/tasks", authorization, TaskController.getTaskByBacklog);
