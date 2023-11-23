import { UserData } from "../../../db/models/user/dataModel";
import { User } from "../../../db/models/user/authModel";
import bcrypt from "bcrypt";
import { jwtGenerateToken } from "../../../util/helpers/jwt";
import { ErrorHandler } from "../../..//util/abstract/error.abs";
import { decryptAES, encryptAES } from "../../../util/helpers/crypto";
import { randomBytes } from "crypto";

export class AuthService {
    public async auth(
        email: string,
        password: string
    ): Promise<{
        error: boolean;
        tokenAuth: string | undefined;
        userData: unknown;
    }> {
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
                        { expiresIn: "90d" }
                    );

                    return { error: false, tokenAuth: token, userData };
                }
            }

            return {
                error: true,
                tokenAuth: undefined,
                userData: "Authentication Error: Invalid Credentials.\n",
            };
        } catch (error) {
            throw new ErrorHandler(String(error));
        }
    }

    public async generatePasswordToken(email: string) {
        const user = await User.findOne({ email });
        const time = Date.now();

        if (user) {
            try {
                const token = randomBytes(32).toString("hex");
                const saltRounds = 12;
                const safeToken = await bcrypt.hash(token, saltRounds);

                await User.updateOne(
                    { email },
                    {
                        resetPasswordToken: safeToken,
                        resetPasswordExpire: time + 60 * 60 * 1000,
                    }
                );

                const encryptedId = encodeURIComponent(encryptAES(user._id));
                const encryptedToken = encodeURIComponent(encryptAES(token));
                const baseUrl = "https://mydomine/user/password/";
                return {
                    link: `${baseUrl}?token=${encryptedToken}&user=${encryptedId}`,
                };
            } catch (error) {
                throw new ErrorHandler(String(error)).emit();
            }
        } else {
            return "User not found";
        }
    }

    public async safeResetPassword(
        token: string,
        _id: string,
        newPassword: string
    ) {
        try {
            const time = Date.now();
            const userId = decodeURIComponent(decryptAES<string>(_id) || "");
            const pass_token = decodeURIComponent(
                decryptAES<string>(token) || ""
            );

            const user = await User.findOne({
                _id: userId,
                resetPasswordToken: { $exists: true },
                resetPasswordExpire: { $gte: time },
            });

            if (
                user &&
                (await bcrypt.compare(pass_token, user.resetPasswordToken))
            ) {
                const saltRounds = 12;
                const hashedPassword = await bcrypt.hash(
                    newPassword,
                    saltRounds
                );

                await User.updateOne(
                    { _id: userId },
                    { password: hashedPassword, resetPasswordToken: "null" }
                );

                return "Successfully password update. Already you can login with your new password.";
            } else {
                return "Invalid reset password token.";
            }
        } catch (error) {
            throw new ErrorHandler(String(error)).emit();
        }
    }
}
