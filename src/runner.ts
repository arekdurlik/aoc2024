import { Expected, Mode, Part, PartModule } from '../types.ts';
import { formatDeltaTime, yellow } from '../utils/formatting.ts';
import { getIsCorrectSymbol } from '../utils/mod.ts';

function withMeasure<T>(fn: () => T) {
    const start = performance.now();
    const result = fn() as T;
    const end = performance.now();
    return { result, time: end - start };
}

function runTest(input: string, solve: Part, expectedValue: Expected) {
    const { result, time } = withMeasure(() => solve(input));
    const isCorrectSymbol = getIsCorrectSymbol(result, expectedValue);

    const elapsedTime = formatDeltaTime(time);
    const formattedResult = yellow(result) + (expectedValue ? ' ' : '') + isCorrectSymbol;

    return formattedResult + ', ' + elapsedTime;
}

export function runTests(tests: Mode[], inputs: string[], module: PartModule) {
    const { solve, expectedValue } = module;

    tests.forEach((mode, idx) => {
        const input = mode === Mode.TEST ? inputs[0] : inputs[1];
        const expected = mode === Mode.TEST ? expectedValue : undefined;
        
        const result = runTest(input, solve, expected);
        const title = mode === Mode.TEST ? 'Test: ' : 'Full: ';

        if (idx === 0) console.log();
        console.log(title + result);
    });
}
