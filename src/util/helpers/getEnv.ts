export function getEnv<t>(name: string): t {
    return process.env[name] as unknown as t;
}
