import { IUserRef } from "../../../types/models/User.type";
import { User, UserData } from "../../../db/models/userModel";
import bcrypt from "bcrypt";
import { ErrorHandler } from "../../../util/abstract/error.abs";
import mongoose from "mongoose";
import { AuthService } from "./auth";

export class UserService extends AuthService {
    public async create({ name, lastname, email, password }: IUserRef) {
        try {
            if (await User.findOne({ email })) {
                return "user already created";
            }

            const userLogin = new mongoose.Types.ObjectId();

            const userDataInstance = new UserData({
                name,
                lastname,
                userLogin,
            });

            await userDataInstance.save();

            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const user = new User({
                _id: userLogin,
                email,
                password: hashedPassword,
                userData: userDataInstance._id,
            });

            await user.save();

            return await this.auth(email, password);
        } catch (error) {
            throw new ErrorHandler(String(error)).log();
        }
    }
}
