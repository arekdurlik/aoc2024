import { Part } from '../../types';
import { getValidNumberPair, hasDoInstruction, hasDontInstruction } from './utils';

export const part2: Part = input => {
    const split = input.split(/mul\(|(?<!\()\)/);
    let sum = 0;
    let enabled = true;

    split.forEach(v => {
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
