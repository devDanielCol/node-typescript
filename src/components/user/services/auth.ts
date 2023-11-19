import { User, UserData } from "../../../db/models/userModel";
import bcrypt from "bcrypt";
import { jwtGenerateToken } from "../../../util/helpers/jwt";
import { ErrorHandler } from "../../..//util/abstract/error.abs";

export class AuthService {
    public async auth(email: string, password: string) {
        try {
            const u = await User.findOne({ email });

            if (u && u.password) {
                const passwordMatch = await bcrypt.compare(
                    password,
                    u.password
                );

                if (passwordMatch) {
                    const userData = await UserData.findOne({
                        userLogin: u._id,
                    });

                    const token = jwtGenerateToken(
                        { email, userLogin: u._id, userData },
                        { expiresIn: "1h" }
                    );

                    return { tokenAuth: token, userData };
                }
            }

            throw new ErrorHandler("Unknow user, failed credentials");
        } catch (error) {
            throw new ErrorHandler(String(error));
        }
    }
}
