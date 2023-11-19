import { Request } from "express";
import { ApiRestMethod } from "../../../util/decorators/restapi/controller.decorator";
import { AuthService } from "../services/auth";
import { IUser } from "src/types/models/User.type";

const service = new AuthService();

export default class AuthController {
    @ApiRestMethod
    public async login(req: Request<unknown, unknown, IUser>) {
        return await service.auth(req.body.email, req.body.password);
    }
}
