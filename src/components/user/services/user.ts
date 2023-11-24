import { IUserData, IUserRef } from "../../../types/models/user.type";
import { User, UserData } from "../../../db/models/userModel";
import bcrypt from "bcrypt";
import { ErrorHandler } from "../../../util/abstract/error.abs";
import mongoose from "mongoose";

export class UserService {
    public async create({ name, lastname, email, password }: IUserRef) {
        try {
            if (await User.findOne({ email })) {
                return "user already created";
            }

            const userLogin = new mongoose.Types.ObjectId();

            const userData = new UserData({
                name,
                lastname,
                userLogin,
            });

            await userData.save();

            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const user = new User({
                _id: userLogin,
                email,
                password: hashedPassword,
                userData: userData._id,
            });

            await user.save();

            return { created: true, message: "success user created" };
        } catch (error) {
            throw new ErrorHandler(String(error)).log();
        }
    }

    public async updateUserData(
        userLogin: mongoose.Types.ObjectId | undefined,
        { name, lastname }: IUserData
    ) {
        try {
            const updated = await UserData.updateOne(
                { userLogin },
                { name, lastname }
            );

            return updated;
        } catch (error) {
            throw new ErrorHandler(String(error));
        }
    }

    public async getCurrentUser(
        userLoged: mongoose.Types.ObjectId | undefined
    ) {
        try {
            return await UserData.findOne({ userLogin: userLoged });
        } catch (error) {
            throw new ErrorHandler(String(error));
        }
    }
}
