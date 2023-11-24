import express from "express";
import api from "./routes";
import MicroServiceConfig from "../../config/app.conf";
import cors, { CorsOptions } from "cors";

const app = express();

const vitals = new MicroServiceConfig(app);
vitals.init();

const corsOptions: CorsOptions = {
    origin: ["localhost"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};

app.use(cors(corsOptions));

app.use("/b95a326c90560546", api);

export { app };
