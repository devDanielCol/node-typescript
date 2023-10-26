import * as env from "dotenv";
import express from "express";
import log from "./util/log/log";
const app = express();

env.config();

app.get("/", (req, resp) => {
    log.req(req.ip, "se realizo una solicitud, daniel creo esto");
    console.log("se realizo una solicitud, daniel creo esto");

    resp.status(200).json({
        name: "ok",
    });
});

export { app };
