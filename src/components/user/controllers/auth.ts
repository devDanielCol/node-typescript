import { Request } from "express";
import { ApiRestMethod } from "../../../util/decorators/restapi/controller.decorator";
import { AuthService } from "../services/auth";
import { IUser } from "src/types/models/User.type";
import { validationResult } from "express-validator";

const service = new AuthService();

export default class AuthController {
    @ApiRestMethod
    public async login(req: Request<any, any, IUser>) {
        const validation = validationResult(req);
        if (!validation.isEmpty()) {
            return validation.array();
        }
        return await service.auth(req.body.email, req.body.password);
    }
}
