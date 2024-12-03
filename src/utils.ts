import { readFileSync } from 'fs';
import { resolve } from 'path';

export function readFile(path: string) {
    return readFileSync(resolve(__dirname, path), 'utf8').trim();
}

export function terminate(string: string) {
    console.error(string);
    process.exit(1);
}

export function getIsCorrectSymbol(result: number, expected?: number) {
    return expected === undefined
        ? ''
        : result == expected
        ? '\x1b[32m(✓)\x1b[0m'
        : '\x1b[31m(X)\x1b[0m';
}
