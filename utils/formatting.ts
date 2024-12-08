export function pad(num: number, size: number) {
    const s = '000000000' + num;
    return s.substring(s.length - size);
}

export function capitalize(string: string) {
    return String(string).charAt(0).toUpperCase() + String(string).slice(1);
}

export function yellow(string: string | number) {
    return '\x1b[33m' + string + '\x1b[0m';
}

export function green(string: string | number) {
    return '\x1b[32m' + string + '\x1b[0m';
}

export function red(string: string | number) {
    return '\x1b[31m' + string + '\x1b[0m';
}

export function purple(string: string | number) {
    return '\x1b[35m' + string + '\x1b[0m';
}

export function getIsCorrectSymbol(result: number, expected?: number) {
    return expected === undefined
        ? ''
        : result == expected
        ? '\x1b[32m' + '(✓)' + '\x1b[0m'
        : '\x1b[31m' + '(X)' + '\x1b[0m';
}

export function formatDeltaTime(deltaTime: number): string {
    if (deltaTime >= 1000) {
        const seconds = Math.floor(deltaTime / 1000);
        const milliseconds = Math.round(deltaTime % 1000);
        return `${seconds}s${milliseconds > 0 ? ` ${milliseconds}ms` : ''}`;
    } else if (deltaTime >= 1) {
        return `${Math.round(deltaTime)}ms`;
    } else if (deltaTime >= 0.001) {
        return `${Math.round(deltaTime * 1000)}μs`;
    } else {
        return `1ms`;
    }
}
