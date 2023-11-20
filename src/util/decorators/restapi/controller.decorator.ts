/* eslint-disable */
import { NextFunction, Response, Request } from "express";
import Log from "../../log/log";
import { validationResult } from "express-validator";
import { HttpStatusCode } from "axios";

export function ApiRestMethod(
    target: any,
    key: string,
    descriptor: PropertyDescriptor = {}
) {
    const originalMethod = descriptor.value;

    // Manejar el caso de accesorios
    if (typeof originalMethod !== "function") {
        return descriptor;
    }

    descriptor.value = async function (
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const validation = validationResult(req);
            if (!validation.isEmpty()) {
                return res
                    .status(HttpStatusCode.BadRequest)
                    .json(validation.array());
            }

            const resolved = await originalMethod.apply(this, [req, res, next]);

            const struct = {
                timestamp: new Date().toISOString(),
                data: resolved,
            };

            res.status(HttpStatusCode.Ok).json(struct);
        } catch (error) {
            Log.message(
                "An error ocurred in controller method",
                `Method: ${key}`,
                String(error)
            );
            res.status(HttpStatusCode.Conflict).json(error);
        }
    };

    return descriptor;
}
