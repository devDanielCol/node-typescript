import mongoose, { MongooseOptions } from "mongoose";
import { getEnv } from "../util/helpers/getEnv";
import Log from "../util/log/log";

export const DATABASE =
    process.env["DATABASE"] || "mongodb://localhost:27017/matrimoniodbase";

const environment = getEnv("NODE_ENV") || "development";

export default function main() {
    mongoose
        .connect(DATABASE)
        .then(() => {
            console.table({
                status: "Initialized",
                useConfig: "local config",
                environment,
                database: DATABASE,
            });

            Log.message("Database initialized");
        })
        .catch((e) => {
            console.log(e);
        });
}

export class DbManager {
    public dataBase: string;
    public name: string;
    private options?: MongooseOptions;

    constructor(nameApp: string = "", dataBaseConecction: string = DATABASE) {
        this.name = nameApp;
        this.dataBase = dataBaseConecction;
    }

    public set setOptions(options: MongooseOptions) {
        this.options = options;
    }

    public startDefaultDatabase(
        success?: CallableFunction,
        error?: CallableFunction
    ) {
        mongoose
            .connect(this.dataBase, this.options && this.options)
            .then(() => {
                console.table({
                    status: "Initialized " + this.name,
                    environment,
                    database: this.dataBase,
                });

                success && success();

                Log.message("Database initialized");
            })
            .catch((e) => {
                error && error(e);
                console.error(e);
            });
    }

    public newConecction(
        url: string,
        success?: CallableFunction,
        error?: CallableFunction
    ) {
        const ctx = mongoose.createConnection(
            url,
            this.options && this.options
        );

        ctx.on("error", () => {
            error && error();
            console.error.bind(console, "Error de conexión :" + url);
        });

        ctx.once("open", () => {
            success && success();
            console.log(`
            DATABASE: ${url}
            STATUS: ${"initialized"}
            `);
        });
    }
}
