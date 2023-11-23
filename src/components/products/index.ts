import { app } from "./app";

const PORT_USER = 9000;

app.listen(PORT_USER, () => {
    console.log("Products app initialized in port: ", PORT_USER);
});

export default app;
