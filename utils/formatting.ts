export function pad(num: number, size: number) {
    const s = '000000000' + num;
    return s.substring(s.length - size);
}

export function capitalize(string: string) {
    return String(string).charAt(0).toUpperCase() + String(string).slice(1);
}

export function green(data: any) {
    return format('\x1b[32m', data);
}

export function yellow(data: any) {
    return format('\x1b[33m', data);
}

export function red(data: any) {
    return format('\x1b[31m', data);
}

export function purple(data: any) {
    return format('\x1b[35m', data);
}

export function blue(data: any) {
    return format('\x1b[34m', data);
}

function format(colorCode: string, data: any) {
    return colorCode + JSON.stringify(data) + '\x1b[0m';
}

export function getIsCorrectSymbol(result: number, expected?: number) {
    return expected === undefined ? '' : result == expected ? green('(✓)') : red('(X)');
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
