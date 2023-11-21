import { Router } from "express";
import { ValidateSession } from "../../middleware/session/session";
import UserController from "./controllers/user";
import AuthController from "./controllers/auth";
import {
    emailVerify,
    passwordVerify,
} from "../..//middleware/validators/validators";

const api = Router();

const userCtrl = new UserController();
const authCtrl = new AuthController();

api.post("/register", emailVerify, passwordVerify, userCtrl.register);
api.post("/login", emailVerify, passwordVerify, authCtrl.login);
api.post("/logout", ValidateSession, authCtrl.logout);
api.get("/me", ValidateSession, userCtrl.userSession);
api.put("/me/update", ValidateSession, userCtrl.updateData);
api.post("/password/reset", emailVerify, authCtrl.generatePasswordToken);
api.post("/password/reset/safe", passwordVerify, authCtrl.safeResetPassword);

export default api;
