import { blue, green, purple, red, yellow } from './mod.ts';

export function validateArgs(args: { day: number; part?: number; mode?: string }) {
    if (
        isNaN(args.day) ||
        (args.part && args.part > 2) ||
        (args.mode && args.mode !== 'test' && args.mode !== 'full')
    ) {
        terminateWithUsage();
    }
}
export function initOutput(args: { day: number; part?: number; mode?: string }) {
    console.clear();
    console.log(
        green(
            `\nDay ${args.day}` +
                `${args.part ? `, part ${args.part}` : ''}` +
                ` (${args.mode ?? 'both tests'}):`,
        ),
    );
}

export function terminate(message?: string) {
    message && console.error(red(message));
    Deno.exit();
}

export function terminateWithUsage() {
    terminate('Invalid arguments. \n\nUsage: deno run dev <day> [part] [test|full]');
}

export const CONSOLE = {
    log(first: any | ((str: string) => string), ...data: any[]) {
        true && console.log(...(typeof first === 'function' ? data.map(first) : [first, ...data]));
    },
    green(...data: any[]) {
        this.log(green, ...data);
    },
    yellow(...data: any[]) {
        this.log(yellow, ...data);
    },
    red(...data: any[]) {
        this.log(red, ...data);
    },
    purple(...data: any[]) {
        this.log(purple, ...data);
    },
    blue(...data: any[]) {
        this.log(blue, ...data);
    },
};
