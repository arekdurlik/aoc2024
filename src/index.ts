import { Day } from './types';
import { getIsCorrectSymbol, readFile, terminate } from './utils';

(async () => {
    const mode = process.env.MODE;
    const day = parseInt(process.argv[2], 10);
    let testInput = '';
    let fullInput = '';

    if (isNaN(day)) {
        terminate(`ERROR: Invalid day parameter.`);
    }

    try {
        testInput = readFile(`../src/days/day${day}/test.txt`);
    } catch {}

    try {
        fullInput = readFile(`days/day${day}/input.txt`);
    } catch {}

    if (!testInput.length && !fullInput.length) {
        terminate(`ERROR: No input data found for day ${day}.`);
    }

    try {
        const selectedDay = (await import(`./days/day${day}/index.ts`)) as Day;

        if (mode === 'watch') {
            console.clear();
            console.log(`Watching day ${day}...\n`);
        } else {
            console.log(`Results for day ${day}:\n`);
        }

        if (testInput.length) {
            const result = selectedDay.part1(testInput);
            const expected = selectedDay.part1TestExpectedValue;

            console.log(
                'Part 1 (test):',
                selectedDay.part1(testInput),
                getIsCorrectSymbol(result, expected)
            );
        }

        if (fullInput.length) {
            console.log('Part 1 (full):', selectedDay.part1(fullInput));
        }

        console.log('\n');

        if (testInput.length) {
            const result = selectedDay.part2(testInput);
            const expected = selectedDay.part2TestExpectedValue;

            console.log(
                'Part 2 (test):',
                selectedDay.part2(testInput),
                getIsCorrectSymbol(result, expected)
            );
        }

        if (fullInput.length) {
            console.log('Part 2 (full):', selectedDay.part2(fullInput));
        }
    } catch (error) {
        terminate(`ERROR: ${error}`);
    }
})();
