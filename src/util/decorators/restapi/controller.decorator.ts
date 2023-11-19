/* eslint-disable */
import { NextFunction, Response, Request } from "express";
import Log from "../../log/log";

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
            const resolved = await originalMethod.apply(this, [req, res, next]);

            const struct = {
                error: false,
                timestamp: new Date().toISOString(),
                data: resolved,
            };

            res.status(200).json(struct);
        } catch (error) {
            Log.message(
                "An error ocurred in controller method",
                `Method: ${key}`,
                String(error)
            );
            res.status(200).json(error);
        }
    };

    return descriptor;
}
