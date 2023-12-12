import bcrypt from "bcrypt";
import { jwtGenerateToken } from "../../../util/helpers/jwt";
import { ErrorHandler } from "../../../util/abstract/error.abs";
import { Service } from "../../../util/abstract/service.abs";
import { AdminDocument, IAdmin } from "../../../types/models/admin.type";
import { Admin } from "../../../db/models/admin/adminModel";

export class AdminService extends Service<AdminDocument, IAdmin> {
    constructor() {
        super(Admin);
    }

    public async auth(
        username: string,
        password: string
    ): Promise<{
        error: boolean;
        tokenAuth: string | undefined;
        message: string;
        admin: unknown;
    }> {
        try {
            const admin = await this.Model.findOne({ username });

            if (admin && admin.password) {
                const passwordMatch = await bcrypt.compare(
                    password,
                    admin.password
                );

                if (passwordMatch) {
                    const token = jwtGenerateToken(
                        { admin },
                        { expiresIn: "90d" }
                    );

                    return {
                        error: false,
                        tokenAuth: token,
                        message: "Login Success fully",
                        admin,
                    };
                }
            }

            return {
                error: true,
                tokenAuth: undefined,
                message: "Authentication Error: Invalid Credentials.\n",
                admin: undefined,
            };
        } catch (error) {
            throw new ErrorHandler(String(error)).emit();
        }
    }

    public async register({ username, password }: IAdmin) {
        const admin = await this.Model.exists({ username });
        if (admin) {
            return "No valid admin create, already exist";
        } else {
            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            return await this.createOne({ username, password: hashedPassword });
        }
    }
}
