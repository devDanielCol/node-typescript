import express from "express";
import api from "./service/routes";
import MicroServiceConfig from "../../config/app.conf";

const app = express();

const vitals = new MicroServiceConfig(app);
vitals.init();

app.use("/user", api);

export { app };
