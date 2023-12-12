import * as env from "dotenv";
import express from "express";
const app = express();
import bodyParser from "body-parser";
import { rateLimit } from "./middleware/rate-limit/ratelimit";
import mongoose from "mongoose";
import { IUserData } from "./types/models/User.type";
import figlet = require("figlet");
import userService from "./components/user/index";
import productsService from "./components/products/index";
import adminService from "./components/admin/index";

declare global {
    interface LogedUserData {
        email?: string;
        userLogin?: mongoose.Types.ObjectId;
        userData?: IUserData;
    }
}

env.config();

/**
 * @description Define libraries and sources
 */
app.use(bodyParser.json({ limit: "200kb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "200kb" }));
app.use(rateLimit);

/**
 * @description All microservices
 */
app.use("/", adminService.instance);
app.use("/", userService.instance);
app.use("/", productsService.instance);

setTimeout(() => {
    figlet("Daniel Backend", function (err, data) {
        if (err) {
            console.log("Something went wrong...");
            console.dir(err);
            return;
        }
        console.log(data);
    });
}, 100);
