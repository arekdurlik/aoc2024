import { Part } from '../../types';
import { hasValidDifferences, isMonotonic } from './utils';

export const part1TestExpectedValue = 2;

function isSafe(list: number[]) {
    return isMonotonic(list) && hasValidDifferences(list);
}

export const part1: Part = input => {
    const numbers = input
        .split('\r\n')
        .map(v => v.split(' '))
        .map(v => v.map(Number));

    let totalSafe = 0;

    numbers.forEach(v => (isSafe(v) ? totalSafe++ : null));

    return totalSafe;
};
