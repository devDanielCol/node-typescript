import { AES, enc } from "crypto-js";
import { getEnv } from "./getEnv";
import { ErrorHandler } from "../abstract/error.abs";

const secret_key = getEnv<string>("CRYPTO_SECRET") || "dev-key";

export function encryptAES(value: object | Buffer | string) {
    try {
        return AES.encrypt(JSON.stringify(value), secret_key).toString();
    } catch (error) {
        throw new ErrorHandler(String(error)).emit();
    }
}

export function decryptAES<Type>(value: string): Type | undefined {
    try {
        const decripted: string = AES.decrypt(value, secret_key).toString(
            enc.Utf8
        ) as unknown as string;
        if (decripted) {
            return JSON.parse(decripted) as unknown as Type;
        }
    } catch (error) {
        throw new ErrorHandler(String(error)).emit();
    }
}
