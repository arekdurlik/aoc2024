import { Expected, Part } from '../../../types.ts';
import { generateCombinations } from 'src/days/07/utils.ts';

export const expectedValue: Expected = 3749;

export const solve: Part = (input) => {
    const lines = input
        .split('\r\n')
        .map((v) => v.split(': '))
        .map((v) => [+v[0], v[1].split(' ').map((v) => +v)]) as [number, number[]][];
    const operations = ['+', '*'];
    let validCalibrationsSum = 0;

    for (const [result, numbers] of lines) {
        const n = numbers.length;
        const combinations = generateCombinations(operations, n - 1);

        for (const combination of combinations) {
            let total = numbers[0];

            for (let i = 0; i < numbers.length - 1; i++) {
                const sign = combination[i];

                if (sign === '+') {
                    total = total + numbers[i + 1];
                } else if (sign === '*') {
                    total = total * numbers[i + 1];
                }
            }

            if (total === result) {
                validCalibrationsSum += total;
                break;
            }
        }
    }

    return validCalibrationsSum;
};
