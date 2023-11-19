import { Router } from "express";
import { ValidateSession } from "../../middleware/session/session";
import UserController from "./controllers/user";
import AuthController from "./controllers/auth";
import { emailVerify } from "../..//middleware/validators/validators";

const api = Router();

const userCtrl = new UserController();
const authCtrl = new AuthController();

api.post("/register", emailVerify, userCtrl.register);
api.get("/me", ValidateSession, userCtrl.userSession);
api.post("/login", emailVerify, authCtrl.login);

export default api;
