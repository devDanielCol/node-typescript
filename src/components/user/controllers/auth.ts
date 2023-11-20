import { Request, Response } from "express";
import { AuthService } from "../services/auth";
import { IUser } from "../../../types/models/User.type";
import { HttpStatusCode } from "axios";
import { ApiRestMethod } from "../../../util/decorators/restapi/controller.decorator";

const service = new AuthService();

export default class AuthController {
    public async login(req: Request<never, never, IUser>, resp: Response) {
        const { userData, error, tokenAuth } = await service.auth(
            req.body.email,
            req.body.password
        );

        if (error) {
            resp.status(400).json({
                successLogin: false,
                message: "Authentication Error: Invalid Credentials.\n",
            });
        } else {
            req.session.user = tokenAuth;
            resp.status(HttpStatusCode.Ok).json({
                successLogin: true,
                data: userData,
            });
        }
    }

    @ApiRestMethod
    public logout(req: Request) {
        req.session.user = null;
        req.session.destroy(() => {
            return "Not found session.";
        });
        return "Closed user session. Logout successfully.";
    }
}
