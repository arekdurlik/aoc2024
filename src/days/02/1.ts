import { Expected, Part } from '../../../types.ts';
import { isSafe } from 'src/days/02/utils.ts';

export const expectedValue: Expected = 2;

export const solve: Part = (input) => {
    const numbers = input
        .split('\r\n')
        .map((v) => v.split(' '))
        .map((v) => v.map(Number));

    let totalSafe = 0;

    numbers.forEach((v) => (isSafe(v) ? totalSafe++ : null));

    return totalSafe;
};
