import Log from "../log/log";

export class ErrorHandler extends Error {
    public log() {
        console.error(this.name, this.message, this.stack);
        Log.error(
            "Error",
            this.message,
            this.name,
            this.stack ? this.stack : ""
        );

        return this.message;
    }

    public emit() {
        return this.message;
    }
}
