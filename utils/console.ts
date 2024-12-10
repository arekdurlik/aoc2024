import { green, red } from './formatting.ts';

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

export function log(...data: any[]) {
    true && console.log(...data);
}
