/* eslint-disable */
import { NextFunction, Response, Request } from "express";
import Log from "../../log/log";

export function ApiRestMethod(
    target: any,
    key: string,
    descriptor: PropertyDescriptor = {}
) {
    const baseMethod = descriptor.value;

    // Manejar el caso de accesorios
    if (typeof baseMethod !== "function") {
        return descriptor;
    }

    descriptor.value = async function (
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const resolved = await baseMethod.apply(this, [req, res, next]);

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
            res.status(500).json(error);
        }
    };

    return descriptor;
}
