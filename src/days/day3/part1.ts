import { Part } from '../../types';
import { getValidNumberPair } from './utils';

export const part1: Part = input => {
    let sum = 0;
    const split = input.split(/mul\(|\)/);

    split.forEach(v => {
        try {
            const numbers = getValidNumberPair(v);
            sum += numbers[0] * numbers[1];
        } catch {}
    });

    return sum;
};
