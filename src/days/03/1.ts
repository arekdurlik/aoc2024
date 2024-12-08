import { Expected, Part } from '../../../types.ts';
import { getValidNumberPair } from 'src/days/03/utils.ts';

export const expectedValue: Expected = 161;

export const solve: Part = (input) => {
    let sum = 0;
    const split = input.split(/mul\(|\)/);

    split.forEach((v) => {
        try {
            const numbers = getValidNumberPair(v);
            sum += numbers[0] * numbers[1];
        } catch {}
    });

    return sum;
};
