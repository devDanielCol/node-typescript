import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "axios";
import { jwtDecodeToken } from "../../util/helpers/jwt";

export function ValidateSession(
    req: Request<unknown, unknown, { user: unknown }>,
    resp: Response,
    next: NextFunction
) {
    const auth = req.headers.authorization;

    if (auth) {
        try {
            const decoded = jwtDecodeToken(auth);
            req.body.user = decoded;
            return next();
        } catch (error) {
            console.error(error);
            return resp
                .status(HttpStatusCode.Unauthorized)
                .json("Unauthorized, invalid token.");
        }
    }

    return resp.status(HttpStatusCode.Unauthorized).json("Unauthorized");
}
