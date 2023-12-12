import "reflect-metadata";
import express, { Application } from "express";
import * as env from "dotenv";
import bodyParser from "body-parser";
import { rateLimit } from "../middleware/rate-limit/ratelimit";
import cookieParser from "cookie-parser";
import session, { Cookie } from "express-session";
import { getEnv } from "../util/helpers/getEnv";
import MongoDbStore from "connect-mongodb-session";
import { DbManager } from "./db.config";

export interface SessionData {
    cookie: Cookie;
}
declare module "express-session" {
    interface SessionData {
        user: string | null;
    }
}

export const SessionDB =
    process.env["SESSION_DB"] || "mongodb://localhost:27017/matrimoniodbase";

const mongoDbSession = MongoDbStore(session);

const store = new mongoDbSession({ uri: SessionDB, collection: "sessions" });

export default class MicroservicesApp {
    private app: Application;
    protected appName: string;

    constructor(appName: string, app: Application = express()) {
        this.appName = appName;
        this.app = app;
    }

    public start() {
        env.config();
        this.app.disable("x-powered-by");
        this.app.use(bodyParser.json({ limit: "200kb" }));
        this.app.use(bodyParser.urlencoded({ extended: true, limit: "200kb" }));
        this.app.use(rateLimit);
        this.app.use(cookieParser());
        this.app.set("trust proxy", 1);
        this.app.use(
            session({
                secret: "secret-key",
                resave: false,
                saveUninitialized: true,
                cookie: {
                    sameSite: "none",
                    secure: getEnv("NODE_ENV") === "development" ? false : true,
                    maxAge: 7776000000,
                },
                store,
            })
        );

        console.log(
            `${String(getEnv("NODE_ENV") || "development")} mode is active.`
        );

        return this;
    }

    public dataBase() {
        return new DbManager(this.appName);
    }

    public get instance() {
        return this.app;
    }

    public listen(PORT: number, start?: CallableFunction) {
        this.app.listen(PORT, () => {
            start && start();
            console.log(
                this.appName +
                    " microservice application was initialized in port: ",
                PORT
            );
        });
    }
}
