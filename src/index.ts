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

    if (isNaN(day)) terminate(`ERROR: Invalid day parameter.`);

    const [testInput, fullInput] = loadInputs();

    const selectedDay = await loadDay(day);

    initOutput();

    let part1TableRows: any = [];
    let part2TableRows: any = [];

    if (testInput.length) {
        part1TableRows.push(runTest(1, 'test'));
        part2TableRows.push(runTest(2, 'test'));
    }

    if (fullInput.length) {
        part1TableRows.push(runTest(1, 'full'));
        part2TableRows.push(runTest(2, 'full'));
    }

    const table1 = renderTable(part1TableRows);
    const table2 = renderTable(part2TableRows, { marginTop: 1 });

    renderOutput([table1, table2]);

    function runTest(part: 1 | 2, type: 'test' | 'full') {
        const testToRun = part === 1 ? selectedDay.part1 : selectedDay.part2;
        const inputToRun = type === 'test' ? testInput : fullInput;
        const expectedValue =
            type === 'full'
                ? undefined
                : part === 1
                ? selectedDay.part1TestExpectedValue
                : selectedDay.part2TestExpectedValue;

        const { result, elapsed } = withMeasure(() => testToRun(inputToRun));

        return ({
            Part: part,
            Type: capitalize(type),
            Result: result ? result + ' ' + getIsCorrectSymbol(result, expectedValue) : '',
            'Elapsed time': result ? elapsed : '',
        });
    }

    function withMeasure(fn: Function) {
        const startTime = process.hrtime();
        const result = fn();
        const elapsed = formatHrtime(process.hrtime(startTime));
        return { result, elapsed };
    }

    function loadInputs() {
        let testInput = '';
        let fullInput = '';

        try {
            testInput = readFile(`../src/days/day${day}/test.txt`);
        } catch {}

        try {
            fullInput = readFile(`./days/day${day}/input.txt`);
        } catch {}

        if (!testInput.length && !fullInput.length) {
            terminate(`ERROR: No input data found for day ${day}.`);
        }

        return [testInput, fullInput];
    }

    function initOutput() {
        console.log(`Running tests...`);

        if (mode === 'watch') {
            console.clear();
            process.stdout.write('\x1Bc');
            console.log(`Watching day ${day}...\n`);
        } else {
            console.log(`\nResults for day ${day}:\n`);
        }
    }

    function renderOutput(data: any[]) {
        data.forEach(v => {
            console.log(v);
        })
    }
})();
