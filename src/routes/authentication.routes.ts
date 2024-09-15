import { Router } from "express";
import { LoginUserController } from "../controller/loginUser.controller";

export const loginRoutes = Router();

loginRoutes.post('/authentication', LoginUserController.login);