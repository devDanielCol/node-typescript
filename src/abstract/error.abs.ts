import { FileSystem } from "../util/helpers/FileSystem";

export class ErrorHandler extends Error {
    public log() {
        const fs = new FileSystem("logs");
        fs.writeFile("log", this.message).catch((e) => {
            console.error(e);
            throw new Error("Error with log");
        });
    }
}
