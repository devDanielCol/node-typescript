import { ConnectOptions } from "mongoose";
import { getEnv } from "../../util/helpers/getEnv";
const DEFAULTDB = "mongodb://localhost:27017/exmple";
export const DATABASE = process.env["DATABASE"] || DEFAULTDB;

export const CONFIG_OPTS: ConnectOptions = {
    appName: getEnv<string>("DATABASE_NAME"),
    user: getEnv<string>("DATABASE_USER"),
    pass: getEnv<string>("DATABASE_PASS"),
};
