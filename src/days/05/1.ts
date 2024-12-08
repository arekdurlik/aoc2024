import { Expected, Part } from '../../../types.ts';

export const expectedValue: Expected = 143;

export const solve: Part = (input) => {
    const [rulesInput, updatesInput] = input.split('\r\n\r\n').map((v) => v.split('\r\n'));
    const rules = rulesInput.map((v) => v.split('|').map((v) => +v));
    const updates = updatesInput.map((v) => v.split(',')).map((v) => v.map((v) => +v));
    let sum = 0;

    function isValidUpdate(update: number[], rules: number[][]): boolean {
        for (const [bigger, smaller] of rules) {
            if (update.indexOf(bigger) > update.indexOf(smaller)) {
                return false;
            }
        }
        return true;
    }

    for (const update of updates) {
        const relevantRules = rules.filter(([a, b]) => update.includes(a) && update.includes(b));

        if (isValidUpdate(update, relevantRules)) {
            sum += update[Math.floor(update.length / 2)];
        }
    }

    return sum;
};
