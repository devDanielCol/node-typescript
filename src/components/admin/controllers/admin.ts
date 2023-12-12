import { Request, Response } from "express";
import { AdminService } from "../services/admin";
import { HttpStatusCode } from "axios";
import { IAdmin } from "../../../types/models/admin.type";
import { ApiRestMethod } from "../../../util/decorators/restapi/controller.decorator";

const service = new AdminService();

export default class AdminController {
    @ApiRestMethod
    public async create(req: Request<never, never, IAdmin>) {
        const { username, password } = req.body;
        const data = await service.register({ username, password });
        return data;
    }

    public async login(req: Request<never, never, IAdmin>, resp: Response) {
        const { admin, error, tokenAuth } = await service.auth(
            req.body.username,
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
                data: admin,
            });
        }
    }
}
