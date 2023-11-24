import { Router } from "express";
import AdminController from "./controllers/admin";

const api = Router();

const adminCtrl = new AdminController();

api.post("/create", adminCtrl.create);
api.post("/acces", adminCtrl.login);

export default api;
