import { Request, Response } from "express";
import { IUserRef } from "../../../types/models/User.type";
import { UserService } from "./service";
import { HttpStatusCode } from "axios";

export function Registration(
    req: Request<never, never, IUserRef>,
    resp: Response
) {
    const body = req.body;
    UserService.create(body)
        .then((data) => {
            resp.status(HttpStatusCode.Created).json({
                status: HttpStatusCode.Created,
                data: data,
            });
        })
        .catch((error) => {
            resp.status(400).json(error);
        });
}
