import { Part } from '../../types';

export const part1TestExpectedValue = 18;

export const part1: Part = input => {
    const word = 'XMAS';
    let lines = input.split('\r\n').map(v => v.split(''));
    let sum = 0;

    function getValidDirections(input: string[][], x: number, y: number): [number, number][][] {
        const totalWidth = input[0].length;
        const totalHeight = input.length;
        const wordLength = 4;
        const directions: [number, number][][] = [];

        function canMove(dx: number, dy: number) {
            return word.split('').every((_, i) => {
                const nx = x + dx * i;
                const ny = y + dy * i;
                return nx >= 0 && nx < totalWidth && ny >= 0 && ny < totalHeight;
            });
        }

        function addDirection(dx: number, dy: number) {
            if (canMove(dx, dy)) {
                directions.push(
                    Array.from({ length: wordLength }, (_, i) => [x + dx * i, y + dy * i])
                );
            }
        }

        addDirection(1, 0);
        addDirection(-1, 0);
        addDirection(0, 1);
        addDirection(0, -1);
        addDirection(1, 1);
        addDirection(-1, -1);
        addDirection(1, -1);
        addDirection(-1, 1);

        return directions;
    }

    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[0].length; j++) {
            if (lines[i][j] !== word[0]) continue;

            const directions = getValidDirections(lines, j, i);

            for (const direction of directions) {
                if (direction.every(([x, y], i) => lines[y][x] === word[i])) {
                    sum += 1;
                }
            }
        }
    }

    return sum;
};
