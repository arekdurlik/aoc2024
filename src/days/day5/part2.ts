import { Part } from '../../types';

export const part2TestExpectedValue = 123;

export const part2: Part = input => {
    const [rulesInput, updatesInput] = input.split('\r\n\r\n').map(v => v.split('\r\n'));
    const rules = rulesInput.map(v => v.split('|').map(v => +v));
    const updates = updatesInput.map(v => v.split(',')).map(v => v.map(v => +v));
    let sum = 0;

    function isValidUpdate(update: number[], rules: number[][]): boolean {
        for (const [bigger, smaller] of rules) {
            if (update.indexOf(bigger) > update.indexOf(smaller)) {
                return false;
            }
        }
        return true;
    }

    function sortUsingRules(update: number[], rules: number[][]): number[] {
        return [...update].sort((a, b) => {
            for (const [before, after] of rules) {
                if (before === a && after === b) {
                    return -1;
                }
                if (before === b && after === a) {
                    return 1;
                }
            }
            return 0;
        });
    }

    for (const update of updates) {
        const relevantRules = rules.filter(([a, b]) => update.includes(a) && update.includes(b));

        if (!isValidUpdate(update, relevantRules)) {
            const sortedUpdate = sortUsingRules(update, relevantRules);

            sum += sortedUpdate[Math.floor(sortedUpdate.length / 2)];
        }
    }

    return sum;
};
