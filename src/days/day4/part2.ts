import { Part } from '../../types';

export const part2TestExpectedValue = 9;

export const part2: Part = input => {
    let lines = input.split('\r\n').map(v => v.split(''));
    let sum = 0;

    function isXmas(input: string[][], i: number, j: number): boolean {
        const topLeft = input[i - 1]?.[j - 1];
        const topRight = input[i - 1]?.[j + 1];
        const bottomRight = input[i + 1]?.[j + 1];
        const bottomLeft = input[i + 1]?.[j - 1];

        if (input[i][j] !== 'A') return false;

        const firstCrossValid =
            (topLeft === 'M' && bottomRight === 'S') || (topLeft === 'S' && bottomRight === 'M');
        const secondCrossValid =
            (bottomLeft === 'M' && topRight === 'S') || (bottomLeft === 'S' && topRight === 'M');

        return firstCrossValid && secondCrossValid;
    }

    for (let i = 1; i < lines.length - 1; i++) {
        for (let j = 1; j < lines[i].length - 1; j++) {
            if (isXmas(lines, j, i)) {
                sum += 1;
            }
        }
    }

    return sum;
};
