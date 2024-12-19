import { Expected, Part } from '../../../types.ts';

export const expectedValue: Expected = '6,1';

enum Cell {
    AGENT = 'O',
    BYTE = '#',
    EMPTY = '.',
}

export const solve: Part = (input) => {
    const { grid, width, height, coords } = processData(input);
    const position = [0, 0];
    const directions = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];

    function processData(input: string) {
        const coords = input.split('\r\n').map((v) => v.split(',').map((v) => +v));
        const maxX = Math.max(...coords.map((v) => v[0]));
        const maxY = Math.max(...coords.map((v) => v[1]));

        const grid = Array(maxY + 1).fill(null).map(() => Array(maxX + 1).fill('.'));

        grid[0][0] = Cell.AGENT;

        return { grid, width: maxX, height: maxY, coords };
    }

    function inBounds(y: number, x: number): boolean {
        return y >= 0 && y < grid.length && x >= 0 && x < grid[y].length;
    }

    function floodFill(y: number, x: number): number {
        const visited = grid.map((v) => v.map(() => false));
        let steps = 0;

        const queue = [[y, x]];

        visited[y][x] = true;

        while (queue.length > 0) {
            const [cx, cy] = queue.shift()!;

            if (cx === width && cy === height) {
                return steps;
            }

            for (const [dx, dy] of directions) {
                const nx = cx + dx;
                const ny = cy + dy;

                if (inBounds(nx, ny) && grid[nx][ny] !== Cell.BYTE && !visited[nx][ny]) {
                    visited[nx][ny] = true;
                    queue.push([nx, ny]);
                }
            }
            steps++;
        }

        return -1;
    }

    for (let i = 0; i < coords.length; i++) {
        const [x, y] = coords[i];
        grid[y][x] = Cell.BYTE;

        const result = floodFill(position[0], position[1]);

        if (result === -1) {
            return `${x},${y}`;
        }
    }

    return '-1,-1';
};
