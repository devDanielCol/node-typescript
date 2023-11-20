import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "axios";
import { jwtDecodeToken } from "../../util/helpers/jwt";

export function ValidateSession(
    req: Request<
        { user: string },
        { user: string },
        { user: unknown },
        { user: string },
        { user: string }
    >,
    resp: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization || "";
    const authCookie = req.session;

    if (authHeader) {
        try {
            const decodedAuthorization = jwtDecodeToken(authHeader);
            req.body.user = decodedAuthorization;

            return next();
        } catch (error) {
            return resp
                .status(HttpStatusCode.Unauthorized)
                .json("Unauthorized: Invalid 'Authorization' token.\n");
        }
    } else if (authCookie && authCookie.user) {
        try {
            const decodedCookie = jwtDecodeToken(authCookie.user);
            req.body.user = decodedCookie;
            return next();
        } catch (error) {
            return resp
                .status(HttpStatusCode.Unauthorized)
                .json("Unauthorized: Invalid 'Session User' token.\n");
        }
    }

    return resp
        .status(HttpStatusCode.Unauthorized)
        .json("Unauthorized, filed credentials");
}
