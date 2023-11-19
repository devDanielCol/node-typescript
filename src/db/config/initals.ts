import mongoose from "mongoose";
import { DATABASE } from "./variables";
import { getEnv } from "../../util/helpers/getEnv";
import Log from "../../util/log/log";

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

export class DefaultDB {
    private static instance: DefaultDB;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    public static getInstance() {
        if (!DefaultDB.instance) {
            DefaultDB.instance = new DefaultDB();
        }
        return DefaultDB.instance;
    }

    public initDatabase() {
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
}
