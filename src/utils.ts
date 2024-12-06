import { readFileSync, readdirSync } from 'fs';
import { join, resolve } from 'path';
import { Day } from './types';
import TtyTable from 'tty-table';

export function readFile(path: string) {
    return readFileSync(resolve(__dirname, path), 'utf8').trim();
}

export async function loadDay(day: number) {
    const dir = resolve(__dirname, `./days/day${day}`);
    const files = readdirSync(dir).filter(
        file => file.startsWith('part1') || file.startsWith('part2')
    );

    const modules = await Promise.all(
        files.map(async file => {
            const module = await import(join(dir, file));
            return module;
        })
    );

    return Object.assign({}, ...modules) as Day;
}

export function terminate(string: string) {
    console.error(string);
    process.exit(1);
}

export function yellow(string: string) {
    return '\x1b[33m' + string + '\x1b[0m';
}

export function green(string: string) {
    return '\x1b[32m' + string + '\x1b[0m';
}

export function red(string: string) {
    return '\x1b[31m' + string + '\x1b[0m';
}

export function getIsCorrectSymbol(result: number, expected?: number) {
    return expected === undefined
        ? ''
        : result == expected
        ? '\x1b[32m' + '(✓)' + '\x1b[0m'
        : '\x1b[31m' + '(X)' + '\x1b[0m';
}

export function capitalize(string: string) {
    return String(string).charAt(0).toUpperCase() + String(string).slice(1);
}

export function renderTable(body: TtyTable.Table, options?: { marginTop?: number }): string {
    const tableOptions = {
        borderStyle: 'solid',
        borderColor: 'white',
        marginTop: options?.marginTop ?? 0,
        headerAlign: 'center',
        headerColor: 'white',
        align: 'center',
        color: 'white',
    };
    const tableHeader = [
        {
            value: 'Part',
            align: 'left',
        },
        {
            value: 'Type',
            align: 'left',
        },
        {
            value: 'Result',
            align: 'left',
            color: 'yellow',
        },
        {
            value: 'Elapsed time',
            align: 'left',
        },
    ];

    return TtyTable(tableHeader, body, tableOptions).render();
}

export function formatHrtime(hrtime: [seconds: number, nanoseconds: number]) {
    const [seconds, nanoseconds] = hrtime;

    const milliseconds = Math.floor(nanoseconds / 1e6);
    const microseconds = Math.floor((nanoseconds % 1e6) / 1e3);
    const remainingNanoseconds = nanoseconds % 1e3;

    const totalSeconds = seconds + Math.floor(milliseconds / 1000);
    const remainingMilliseconds = milliseconds % 1000;

    const totalMinutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    const parts = [];
    if (totalMinutes > 0) {
        parts.push(`${totalMinutes}m`, `${remainingSeconds}s`);
    } else if (totalSeconds > 0) {
        parts.push(`${totalSeconds}s`);
        if (remainingMilliseconds > 0) parts.push(`${remainingMilliseconds}ms`);
    } else if (remainingMilliseconds > 0) {
        parts.push(`${remainingMilliseconds}ms`);
        if (microseconds > 0) parts.push(`${microseconds}μs`);
    } else if (microseconds > 0) {
        parts.push(`${microseconds}μs`);
        if (remainingNanoseconds > 0) parts.push(`${remainingNanoseconds}ns`);
    } else {
        parts.push(`${remainingNanoseconds}ns`);
    }

    return parts.filter(Boolean).join(' ');
}
