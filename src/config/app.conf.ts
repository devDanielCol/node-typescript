import { Application } from "express";
import * as env from "dotenv";
import bodyParser from "body-parser";
import { rateLimit } from "../middleware/rate-limit/ratelimit";
import "reflect-metadata";

export default class MicroServiceInstance {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public init() {
        env.config();
        this.app.use(bodyParser.json({ limit: "200kb" }));
        this.app.use(bodyParser.urlencoded({ extended: true, limit: "200kb" }));
        this.app.use(rateLimit);

        return this;
    }
}
