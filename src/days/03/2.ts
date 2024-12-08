import { Expected, Part } from '../../../types.ts';
import { getValidNumberPair, hasDoInstruction, hasDontInstruction } from 'src/days/03/utils.ts';

export const expectedValue: Expected = 48;

export const solve: Part = (input) => {
    const split = input.split(/mul\(|(?<!\()\)/);
    let sum = 0;
    let enabled = true;

    split.forEach((v) => {
        if (hasDoInstruction(v)) {
            enabled = true;
        } else if (hasDontInstruction(v)) {
            enabled = false;
        } else if (enabled) {
            try {
                const numbers = getValidNumberPair(v);
                sum += numbers[0] * numbers[1];
            } catch {}
        }
    });

    return sum;
};
