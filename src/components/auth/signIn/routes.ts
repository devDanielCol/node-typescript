import { Router } from "express";
import { login } from "./controller";

const pointer = Router();

pointer.post("/login", login);

export default pointer;
