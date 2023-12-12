import { access, mkdir, writeFile, readFile, appendFile } from "fs/promises";
import { join } from "path";

export class FileSystem {
    private root = "../../../";
    private defaultName = "server_files";
    public path: string;
    private date = new Date(Date.now()).toDateString();

    /**
     *
     * @param dir The path of the root directory when you will work
     * @description If this path of the directory not exist the constructor create an directory with this name.
     */
    constructor(dir: string) {
        this.path = join(__dirname, this.root, `${dir}.${this.defaultName}`);
        console.log(this.path);

        this.flOnInit(dir);
    }

    private flOnInit(mkdir__name: string) {
        this.mkdir(mkdir__name).catch(() => {
            console.log("error intializing or creating: ", mkdir__name, " dir");
        });
    }

    private async accesDir(fileName: string) {
        try {
            const path = join(
                __dirname,
                this.root,
                `${fileName}.${this.defaultName}`
            );
            await access(path);
            return true;
        } catch (error) {
            return false;
        }
    }

    public async acces(fileName: string) {
        try {
            const path = `${this.path}/${fileName}`;
            await access(path);
            return true;
        } catch (error) {
            return false;
        }
    }

    async mkdir(name: string) {
        try {
            const acces = await this.accesDir(name);

            if (!acces) {
                const path = join(
                    __dirname,
                    this.root,
                    `${name}.${this.defaultName}`
                );
                await mkdir(path, { recursive: true });
                console.log("New directory path '".concat(name, "' created"));
            }
            return this;
        } catch (error) {
            console.error(error);
            return new Error("Dir not created");
        }
    }

    private async write(fileName: string, content: unknown) {
        try {
            const controller = new AbortController();
            const { signal } = controller;
            const acces = await this.acces(this.getName(fileName));

            const path = `${this.path}/${this.getName(fileName)}`;

            if (!acces) {
                await writeFile(path, `started on ${this.date}`, {
                    signal,
                    encoding: "utf-8",
                });
                await appendFile(path, `${String(content)}\n`);
            } else {
                await appendFile(path, `${String(content)}\n`);
            }

            return path;
        } catch (error) {
            console.log(error);
            throw new Error("Error creating files");
        }
    }

    public async readFile(fileName: string) {
        const filePath = `${this.path}/${this.getName(fileName)}`;

        return await readFile(filePath, { encoding: "utf8" });
    }

    public async writeFile(fileName: string, content: string) {
        try {
            await this.write(fileName, content);
            return this;
        } catch (error) {
            console.log(error);
            throw new Error("Cant write in this file");
        }
    }

    private getName(name: string) {
        return `${String(this.date).replace(" ", "_")}-${name}`;
    }
}
