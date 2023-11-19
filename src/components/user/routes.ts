import { Router } from "express";
import { ValidateSession } from "../../middleware/session/session";
import UserController from "./controllers/user";
import AuthController from "./controllers/auth";

const api = Router();

const userCtrl = new UserController();
const authCtrl = new AuthController();

api.post("/register", userCtrl.register);
api.get("/me", ValidateSession, userCtrl.userSession);
api.post("/login", authCtrl.login);

export default api;
