import { Request, Response } from "express";
import { ILogin } from "../../../types/components/auth.type";
import { HttpStatusCode } from "axios";
import SignInService from "./service";

export function login(req: Request<unknown, unknown, ILogin>, resp: Response) {
    const data = req.body;
    SignInService.login(data);
    resp.status(HttpStatusCode.Accepted).json(SignInService.login(data));
}
