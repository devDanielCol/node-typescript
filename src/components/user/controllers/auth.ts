import { Request, Response } from "express";
import { AuthService } from "../services/auth";
import { IUser } from "../../../types/models/User.type";
import { HttpStatusCode } from "axios";
import { ApiRestMethod } from "../../../util/decorators/restapi/controller.decorator";

const service = new AuthService();

export default class AuthController {
    public async login(req: Request<never, never, IUser>, resp: Response) {
        const data = await service.auth(req.body.email, req.body.password);

        if (data.error) {
            resp.status(400).json(
                "Authentication Error: Invalid Credentials.\n"
            );
        } else {
            req.session.user = data.tokenAuth;
            resp.status(HttpStatusCode.Ok).json(data);
        }
    }

    @ApiRestMethod
    public logout(req: Request) {
        req.session.user = null;
        req.session.destroy(() => {
            console.info("session was been deleted");
        });
        return "Closed user session. Logout successfully.";
    }
}
