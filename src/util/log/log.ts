import { FileSystem } from "../helpers/FileSystem";

const fs = new FileSystem("logs");

export default function log(message: string) {
    fs.mkdir("logs").catch((e) => {
        console.error(e);
        throw new Error("Cant make log");
    });
    fs.writeFile("log", message).catch((e) => {
        console.error(e);
        throw new Error("Cant make log");
    });
}
