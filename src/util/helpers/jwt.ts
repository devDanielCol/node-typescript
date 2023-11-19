import { ErrorHandler } from "../abstract/error.abs";
import { getEnv } from "./getEnv";
import jwt, { SignOptions } from "jsonwebtoken";

const secret_key: string = getEnv("JWT_SECRET_KEY") || "dev-key";

/**
 * Use this helper for make a new JWT token with sign
 * @param data The data to save in token
 * @param options The JWT options
 * @returns Returns the generated JWT
 */
export function jwtGenerateToken(
    data: string | object | Buffer,
    options?: SignOptions
): string | undefined {
    try {
        const token = jwt.sign(data, secret_key, {
            ...options,
        });

        return token;
    } catch (error) {
        throw new ErrorHandler(String(error));
    }
}

/**
 * Use this function for get and verify de JWT data in the pased token
 *
 * @param token The JWT for validate
 * @returns Returns the decoded data
 */
export function jwtDecodeToken(token: string) {
    try {
        const decoded = jwt.verify(token, secret_key);
        return decoded;
    } catch (error) {
        throw new ErrorHandler(String(error));
    }
}
