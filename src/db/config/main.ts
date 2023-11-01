import mongoose from "mongoose";
import { DATABASE } from "./mongoose.start";
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
