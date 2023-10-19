import { app } from "./app";
import { DATABASE } from "./db/start/mongoose.start";
import { ErrorHandler } from "./abstract/error.abs";
import mongoose from "mongoose";
import { getEnv } from "./util/helpers/getEnv";

export const port = getEnv("PORT") || 8000;
export const environment = getEnv("NODE_ENV") || "development";

export default async function main() {
    await mongoose
        .connect(DATABASE)
        .then(() => {
            app.listen(port, function () {
                console.table({
                    status: "Initialized",
                    useConfig: "local config",
                    environment,
                    port,
                });
            });
        })
        .catch(() => {
            throw new ErrorHandler(
                "Database not initialized, a connection error ocurred"
            );
        });
}

void main();
