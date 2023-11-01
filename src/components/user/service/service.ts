import { IUserRef } from "../../../types/models/User.type";
import { User, UserData } from "../../../db/models/userModel";
import mongoose from "mongoose";

export class UserService {
    static async create({ name, lastname, email, password }: IUserRef) {
        try {
            if (await User.findOne({ email })) {
                return "user already created";
            }

            const ud = await UserData.create({
                _id: new mongoose.Types.ObjectId(),
                name,
                lastname,
            });

            await User.create({
                email,
                password,
                ref: ud._id,
            });

            return ud;
        } catch (error) {
            return error;
        }
    }
}
