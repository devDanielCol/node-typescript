import * as env from "dotenv";
import express from "express";
const app = express();
import bodyParser from "body-parser";
import { rateLimit } from "./middleware/rate-limit/ratelimit";
import userService from "./components/user/index";
import dataBaseInit from "./db/config/initals";

env.config();

/**
 * @description Database mongoDb Initialized
 **/
dataBaseInit();

/**
 * @description Define libraries and sources
 */
app.use(bodyParser.json({ limit: "200kb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "200kb" }));
app.use(rateLimit);

/**
 * @description All microservices
 */
app.use("/", userService);
