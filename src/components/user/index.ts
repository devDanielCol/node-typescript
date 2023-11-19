import { app } from "./app";

const PORT_USER = 8080;

app.listen(PORT_USER, () => {
    console.log("User app initialized in port: ", PORT_USER);
});

export default app;
