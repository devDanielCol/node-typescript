import { ErrorHandler } from "../abstract/error.abs";
import { FileSystem } from "../helpers/FileSystem";

const fs = new FileSystem("logs");

export default class Log {
    public static req(ip: string, ...res: string[]) {
        try {
            const now = Date.now();
            const date = new Date(now).toString();

            const data = [
                [
                    `REQUEST FROM ${ip}`,
                    ["date", date],
                    ["ip-address", ip],
                    ["details", res],
                ],
            ];

            fs.writeFile("log.log", JSON.stringify(data) + ",").catch((e) => {
                console.error(e);
                throw new Error("Cant make log");
            });

            return this;
        } catch (error) {
            throw new ErrorHandler();
        }
    }

    public static message(message: string, ...res: string[]) {
        const now = Date.now();
        const date = new Date(now).toString();

        const data = [
            "MESSAGGE",
            [
                ["date", date],
                ["message", message],
                ["details", res],
            ],
        ];

        fs.writeFile("log.log", JSON.stringify(data) + ",").catch((e) => {
            console.error(e);
            throw new Error("Cant make log message");
        });

        return this;
    }

    public static error(error: object | string, ...res: string[]) {
        const now = Date.now();
        const date = new Date(now).toString();

        const data = [
            "ERROR",
            [
                ["date", date],
                ["error", JSON.stringify(error)],
                ["details", res],
            ],
        ];

        fs.writeFile("log.log", JSON.stringify(data) + ",").catch((e) => {
            console.error(e);
            throw new Error("Cant make log error");
        });

        return this;
    }
}
