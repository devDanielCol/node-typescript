import { app } from "./app";

const PORT_USER = 9000;

app.listen(PORT_USER, () => {
    console.log("Admin service", PORT_USER);
});

export default app;
