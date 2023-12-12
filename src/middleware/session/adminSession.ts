import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "axios";
import { jwtDecodeToken } from "../../util/helpers/jwt";
import { AdminDocument } from "../../types/models/admin.type";
import { Admin } from "../../db/models/admin/adminModel";

export async function ValidateAdminSession(
    req: Request<never, never, { user: unknown }>,
    resp: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization || "";
    const authCookie = req.session;

    if (authHeader) {
        try {
            const decodedAuthorization = jwtDecodeToken<{
                admin: AdminDocument;
            }>(authHeader);
            const { roll, _id } = decodedAuthorization.admin;
            req.body.user = decodedAuthorization;

            if (roll === "admin") {
                const admin = await Admin.exists({ _id });

                if (admin) {
                    return next();
                }
            }

            return resp
                .status(HttpStatusCode.Unauthorized)
                .json("Unknow credentials.\n");
        } catch (error) {
            return resp
                .status(HttpStatusCode.Unauthorized)
                .json("Unauthorized: Invalid 'Authorization'.\n");
        }
    } else if (authCookie && authCookie.user) {
        try {
            const decodedCookie = jwtDecodeToken<{ admin: AdminDocument }>(
                authCookie.user
            );
            const { roll, _id } = decodedCookie.admin;
            req.body.user = decodedCookie;

            if (roll === "admin") {
                const admin = await Admin.exists({ _id });

                if (admin) {
                    return next();
                }
            }

            return resp
                .status(HttpStatusCode.Unauthorized)
                .json("Unknow credentials.\n");
        } catch (error) {
            return resp
                .status(HttpStatusCode.Unauthorized)
                .json("Unauthorized: Invalid 'User Info'..\n");
        }
    }

    return resp
        .status(HttpStatusCode.Unauthorized)
        .json("Unauthorized, filed credentials");
}
