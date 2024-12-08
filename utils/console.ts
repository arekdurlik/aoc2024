import { red } from './formatting.ts';

export function validateArgs(args: { day: number; part?: number; mode?: string }) {
    if (isNaN(args.day)) terminateWithUsage();

    if (args.part && args.part > 2) terminateWithUsage();
    if (args.mode && args.mode !== 'test' && args.mode !== 'full') terminateWithUsage();
}
export function initOutput(args: { day: number; part?: number; mode?: string }) {
    if (isNaN(args.day)) terminateWithUsage();

    console.clear();
    console.log(
        `\nDay ${args.day}` +
            `${args.part ? `, part ${args.part}` : ''}` +
            ` (${args.mode ?? 'both tests'}):`,
    );
}

export function terminate(message?: string) {
    message && console.error(red(message));
    Deno.exit();
}

export function terminateWithUsage() {
    terminate('Invalid arguments. \n\nUsage: deno run dev <day> [part] [test|full]');
}
