import { Day } from './types';
import { readFile, terminate } from './utils';

(async () => {
    const mode = process.env.MODE || 'full';
    const day = parseInt(process.argv[2], 10);
    const part = parseInt(process.argv[3], 10);
    let input = '';

    if (isNaN(day)) {
        terminate(`ERROR: Invalid parameters. Usage: npm run ${mode} <day> [part]`);
    }

    try {
        input = readFile(mode === 'full' ? `days/day${day}/input.txt` : `days/day${day}/test.txt`);

        if (!input.length) throw Error();
    } catch {
        terminate(
            `ERROR: ${mode === 'full' ? 'Full' : 'Test'} input for day ${day} does not exist.`
        );
    }

    try {
        const selectedDay = (await import(`./days/day${day}/index.ts`)) as Day;

        if (part === 1 || part === 2 || isNaN(part)) {
            if (part === 1 || isNaN(part)) {
                console.log(`Day ${day}, part 1:`, selectedDay.part1(input));
            }

            if (part === 2 || isNaN(part)) {
                console.log(`Day ${day}, part 2:`, selectedDay.part2(input));
            }
        } else {
            terminate('ERROR: Invalid part parameter.');
        }
    } catch (error) {
        terminate(`ERROR: Day ${day} does not exist.`);
    }
})();
