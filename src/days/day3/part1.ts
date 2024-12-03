import { Part } from '../../types';
import { getValidNumberPair } from './utils';

export const part1: Part = input => {
    let product = 0;
    const split = input.split(/mul\(|\)/);

    split.forEach(v => {
        try {
            const numbers = getValidNumberPair(v);
            product += numbers[0] * numbers[1];
        } catch {}
    });

    return product;
};
