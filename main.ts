import { runTests } from './src/runner.ts';
import { initOutput, loadDay, loadInputs, loadPart, validateArgs } from './utils/mod.ts';
import { Mode } from './types.ts';

if (import.meta.main) {
    const day = +Deno.args[0];
    const part = +Deno.args[1];
    const mode = Deno.args[2];

    validateArgs({ day, part, mode });

    const inputs = await loadInputs(day);
    const tests = mode === Mode.FULL
        ? [Mode.FULL]
        : mode === Mode.TEST
        ? [Mode.TEST]
        : [Mode.TEST, Mode.FULL];

    initOutput({ day, part, mode });

    if (part) {
        const module = await loadPart(day, part);
        runTests(tests, inputs, module);
    } else {
        const parts = await loadDay(day);
        for (const module of parts) {
            runTests(tests, inputs, module);
        }
    }
}
