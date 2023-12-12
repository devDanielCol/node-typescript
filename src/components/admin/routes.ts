import { Router } from "express";
import AdminController from "./controllers/admin";
import { ValidateAdminSession } from "../../middleware/session/adminSession";

const api = Router();

const adminCtrl = new AdminController();

api.post("/create", ValidateAdminSession, adminCtrl.create);
api.post("/access", adminCtrl.login);

export default api;
