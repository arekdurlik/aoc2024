import { Mode, PartModule } from '../types.ts';
import { pad } from './formatting.ts';

export async function loadPart(day: number, part = 1) {
    return await import(`src/days/${pad(day, 2)}/${+part}.ts`) as PartModule;
}

export function loadDay(day: number): Promise<[PartModule, PartModule]> {
    return Promise.all([
        loadPart(day, 1),
        loadPart(day, 2),
    ]);
}

export async function loadInput(day: number, mode: Mode) {
    return await Deno.readTextFile(
        Deno.realPathSync(
            `src/days/${pad(day, 2)}/${mode === Mode.TEST ? 'test' : 'input'}.txt`,
        ),
    );
}

export async function loadInputs(day: number) {
    return await Promise.all([
        loadInput(day, Mode.TEST),
        loadInput(day, Mode.FULL),
    ]);
}
