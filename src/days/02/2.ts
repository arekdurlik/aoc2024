import { Expected, Part } from '../../../types.ts';
import { isSafe } from 'src/days/02/utils.ts';

export const expectedValue: Expected = 4;

function isSafeDampened(list: number[]) {
    if (isSafe(list)) {
        return true;
    }

    return list.some((_, i) => {
        const dampened = [...list.slice(0, i), ...list.slice(i + 1)];

        return isSafe(dampened);
    });
}

export const solve: Part = (input) => {
    const numbers = input
        .split('\r\n')
        .map((v) => v.split(' '))
        .map((v) => v.map(Number));

    let totalSafe = 0;

    numbers.forEach((v) => (isSafeDampened(v) ? totalSafe++ : null));

    return totalSafe;
};
