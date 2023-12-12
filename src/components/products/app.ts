import api from "./routes";
import MicroserviceApp from "../../config/app.config";
import cors, { CorsOptions } from "cors";

const app = new MicroserviceApp("USER_APP");
app.start().dataBase().startDatabase();

const corsOptions: CorsOptions = {
    origin: ["localhost"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};

app.instance.use(cors(corsOptions));
app.instance.use("/products", api);

export { app };
