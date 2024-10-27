import { Router } from "express";

import { loginRoutes } from "./authentication.routes";
import UserController from "../controller/User.controller";
import { authorization } from "../middleware/authorization";
import { SquadController } from "../controller/Squad.controller";
import { ProjectController } from "../controller/Project.controller";
import { BacklogController } from "../controller/backlog.controller";
import { UserCreationController } from "../controller/userCreation.controller";

export const routes = Router();

//Login
routes.use("/session", loginRoutes)


// User Creation
routes.post("/session/user/create", authorization, UserCreationController.createUser); 
routes.get('/session/user/create', UserCreationController.getUsersCreatedBy);

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

//Project
routes.post("/session/project/createProject", authorization, ProjectController.createProject);
routes.get("/session/project", authorization, ProjectController.getAllProjet);
routes.get("/session/project/:project_id", authorization, ProjectController.getProjectById);
routes.put("/session/project/:project_id", authorization, ProjectController.updateProject);
routes.delete("/session/project/:project_id", authorization, ProjectController.deleteProject);



//BackLog
routes.post("/session/backlog/createBacklog", authorization, BacklogController.createBacklog);
routes.get("/session/backlog/:backlog_id", authorization, BacklogController.getBacklogById);
routes.get("/session/backlog/", authorization, BacklogController.getAllBacklog);
routes.delete("/session/backlog/:backlog_id", authorization, BacklogController.deleteBacklog);
routes.put("/session/backlog/:backlog_id", authorization, BacklogController.updadeBacklog);
