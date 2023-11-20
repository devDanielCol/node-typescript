import { Request } from "express";
import { ApiRestMethod } from "../../../util/decorators/restapi/controller.decorator";
import { UserService } from "../services/user";
import { IUser, IUserData } from "src/types/models/User.type";

const service = new UserService();
export default class UserController {
    @ApiRestMethod
    public async register(req: Request<never, never, never, IUser>) {
        return await service.create(req.body);
    }

    @ApiRestMethod
    public async userSession(
        req: Request<unknown, unknown, { user: LogedUserData }>
    ) {
        return await service.getCurrentUser(req.body.user.userLogin);
    }

    @ApiRestMethod
    public async updateData(
        req: Request<never, never, IUserData & { user: LogedUserData }>
    ) {
        const { name, lastname, user } = req.body;

        return await service.updateUserData(user.userLogin, { name, lastname });
    }
}
