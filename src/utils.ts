import { readFileSync } from 'fs';
import { resolve } from 'path';

export function readFile(path: string) {
    return readFileSync(resolve(__dirname, path), 'utf8').trim();
}

export function terminate(string: string) {
    console.error(string);
    process.exit(1);
}
