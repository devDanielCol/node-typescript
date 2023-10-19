import * as env from "dotenv";
import express from "express";
const app = express();

env.config();

app.get("/", (req, resp) => {
    resp.status(200).json({
        name: "ok",
    });
});

export { app };
