import { Router } from "express";
import { Registration } from "./controller";

const api = Router();

api.post("/register", Registration);

export default api;
