import { NextFunction, Request, Response } from "express";
import { ApiRestMethod } from "../../../util/decorators/restapi/controller.decorator";
import { UserService } from "./service";
import { IUser } from "src/types/models/User.type";

export class Registration {
    private type: string;

    constructor(type: string) {
        this.type = type;
    }

    @ApiRestMethod
    public async register(
        req: Request<never, never, never, IUser>,
        resp: Response,
        next: NextFunction
    ) {
        return UserService.create(req.body);
    }
}
