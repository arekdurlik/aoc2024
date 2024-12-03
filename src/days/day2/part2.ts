import { Part } from '../../types';
import { hasValidDifferences, isMonotonic } from './utils';

export const part2TestExpectedValue = 4;

function isSafe(list: number[]) {
    return isMonotonic(list) && hasValidDifferences(list);
}

function isSafeDampened(list: number[]) {
    if (isSafe(list)) {
        return true;
    }

    return list.some((_, i) => {
        const dampened = [...list.slice(0, i), ...list.slice(i + 1)];

        return isSafe(dampened);
    });
}

export const part2: Part = input => {
    const numbers = input
        .split('\r\n')
        .map(v => v.split(' '))
        .map(v => v.map(Number));

    let totalSafe = 0;

    numbers.forEach(v => (isSafeDampened(v) ? totalSafe++ : null));

    return totalSafe;
};
