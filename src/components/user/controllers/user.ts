import { Request } from "express";
import { ApiRestMethod } from "../../../util/decorators/restapi/controller.decorator";
import { UserService } from "../services/user";
import { IUser } from "src/types/models/User.type";
import { validationResult } from "express-validator";

export default class UserController {
    @ApiRestMethod
    public async register(req: Request<never, never, never, IUser>) {
        const validation = validationResult(req);
        if (!validation.isEmpty()) {
            return validation.array();
        }

        const us = new UserService();

        return await us.create(req.body);
    }

    @ApiRestMethod
    public userSession(req: Request<unknown, unknown, { user: unknown }>) {
        return req.body.user;
    }
}
