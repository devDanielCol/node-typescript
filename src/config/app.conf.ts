import "reflect-metadata";
import { Application } from "express";
import * as env from "dotenv";
import bodyParser from "body-parser";
import { rateLimit } from "../middleware/rate-limit/ratelimit";
import cookieParser from "cookie-parser";
import session, { Cookie } from "express-session";
import { getEnv } from "../util/helpers/getEnv";
import MongoDbStore from "connect-mongodb-session";
import { DATABASE } from "../db/config/variables";

export interface SessionData {
    cookie: Cookie;
}
declare module "express-session" {
    interface SessionData {
        user: string | null;
    }
}

const mongoDbSession = MongoDbStore(session);

const store = new mongoDbSession({ uri: DATABASE, collection: "sessions" });

export default class MicroServiceInstance {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public init() {
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
            `${String(getEnv("NODE_ENV") || "development")} is active.`
        );

        return this;
    }
}
