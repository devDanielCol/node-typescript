import MicroservicesApp from "../../config/app.config";
import api from "./routes";
import cors, { CorsOptions } from "cors";

const app = new MicroservicesApp("ADMIN_APP");
app.useDefault().dataBase().startDefaultDatabase();

const corsOptions: CorsOptions = {
    origin: ["localhost"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};

app.instance.use(cors(corsOptions));

app.instance.use("/b95a326c90560546", api);

export { app };
