import { IUserRef } from "../../../types/models/User.type";
import { User, UserData } from "../../../db/models/userModel";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "../../../util/abstract/error.abs";

export class UserService {
    protected secretKey = "cret-key";

    public static async create({ name, lastname, email, password }: IUserRef) {
        try {
            if (await User.findOne({ email })) {
                return "user already created";
            }

            const ud = new UserData({
                _id: new mongoose.Types.ObjectId(),
                name,
                lastname,
            });

            ud.save().catch(() => {
                throw new ErrorHandler("Error al crear Datos de usuario");
            });

            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const u = new User({
                email,
                password: hashedPassword,
                ref: ud._id,
            });

            u.save()
                .then(() => {
                    this.auth(email, password)
                        .then((login) => {
                            return { login, userData: login };
                        })
                        .catch(() => {
                            throw new ErrorHandler(
                                "Usuario creado pero error al realizar el login"
                            ).log();
                        });
                })
                .catch(() => {
                    throw new ErrorHandler("Error al crear usuario").log();
                });
        } catch (error) {
            throw new ErrorHandler(String(error)).log();
        }
    }

    public static async auth(username: string, password: string) {
        const u = await User.findOne({ username });

        if (u && u.password) {
            const passwordMatch = await bcrypt.compare(password, u.password);

            if (passwordMatch) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                const token = jwt.sign({ username, _id: u._id }, "secret-key", {
                    expiresIn: "90d",
                });

                const userData = UserData.findOne({ userLoginId: u._id });

                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                return { tokenAuth: token, userData };
            }
        }

        return null;
    }
}
