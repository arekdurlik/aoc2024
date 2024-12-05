import {
    capitalize,
    formatHrtime,
    getIsCorrectSymbol,
    loadDay,
    readFile,
    renderTable,
    terminate,
} from './utils';

(async () => {
    const mode = process.env.MODE;
    const day = parseInt(process.argv[2], 10);
    let testInput = '';
    let fullInput = '';

    if (mode === 'watch') {
        console.clear();
        process.stdout.write('\x1Bc');
    }

    console.log(`Running tests...`);

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
        const selectedDay = await loadDay(day);

        let tableRows: any = [];

        runTest(1, 'test');
        runTest(1, 'full');

        const table1 = renderTable(tableRows);
        tableRows = [];

        runTest(2, 'test');
        runTest(2, 'full');

        const table2 = renderTable(tableRows, { marginTop: 1 });

        if (mode === 'watch') {
            console.clear();
            process.stdout.write('\x1Bc');
            console.log(`Watching day ${day}...\n`);
        } else {
            console.log(`\nResults for day ${day}:\n`);
        }

        console.log(table1);
        console.log(table2);

        function runTest(part: 1 | 2, type: 'test' | 'full') {
            const testToRun = part === 1 ? selectedDay.part1 : selectedDay.part2;
            const inputToRun = type === 'test' ? testInput : fullInput;
            const expectedValue =
                type === 'full'
                    ? undefined
                    : part === 1
                    ? selectedDay.part1TestExpectedValue
                    : selectedDay.part2TestExpectedValue;

            let result = undefined;
            let elapsed = '';

            const startTime = process.hrtime();
            result = testToRun(inputToRun);
            elapsed = formatHrtime(process.hrtime(startTime));

            tableRows.push({
                Part: part,
                Type: capitalize(type),
                Result: result ? result + ' ' + getIsCorrectSymbol(result, expectedValue) : '',
                'Elapsed time': result ? elapsed : '',
            });
        }
    } catch (error) {
        terminate(`ERROR: ${error}`);
    }
})();
