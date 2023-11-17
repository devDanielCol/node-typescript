import { Router } from "express";
import { Registration } from "./controller";

const api = Router();

const regs = new Registration("Registration");

// eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/unbound-method
api.post("/register", regs.register);

export default api;
