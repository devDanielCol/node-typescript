import { ConnectOptions } from "mongoose";
import { getEnv } from "../../util/helpers/getEnv";

export const DATABASE = process.env["DATABASE"] || "";

export const CONFIG_OPTS: ConnectOptions = {
    appName: getEnv<string>("DATABASE_NAME"),
    user: getEnv<string>("DATABASE_USER"),
    pass: getEnv<string>("DATABASE_PASS"),
};
