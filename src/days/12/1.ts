import { Expected, Part } from '../../../types.ts';

export const expectedValue: Expected = 1930;

type Cell = [number, number];

export const solve: Part = (input) => {
    const grid = input.split('\r\n').map((row) => row.split(''));
    const visited = grid.map((v) => v.map(() => false));
    const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];

    let sum = 0;

    function inBounds(x: number, y: number): boolean {
        return x >= 0 && x < grid[0].length && y >= 0 && y < grid.length;
    }

    function floodFill(x: number, y: number, symbol: string): Cell[] {
        const queue: Cell[] = [[x, y]];
        const cells: Cell[] = [];

        while (queue.length > 0) {
            const [cx, cy] = queue.shift()!;
            cells.push([cx, cy]);

            visited[x][y] = true;

            for (const [dx, dy] of directions) {
                const nx = cx + dx;
                const ny = cy + dy;

                if (
                    inBounds(nx, ny) &&
                    grid[nx][ny] === symbol &&
                    !visited[nx][ny]
                ) {
                    visited[nx][ny] = true;
                    queue.push([nx, ny]);
                }
            }
        }

        return cells;
    }

    function calculatePerimeter(cells: Cell[], symbol: string): number {
        let perimeter = 0;

        for (const [x, y] of cells) {
            for (const [dx, dy] of directions) {
                const nx = x + dx;
                const ny = y + dy;

                if (!inBounds(nx, ny) || grid[nx][ny] !== symbol) {
                    perimeter++;
                }
            }
        }

        return perimeter;
    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (!visited[i][j]) {
                const symbol = grid[i][j];
                const cells = floodFill(i, j, symbol);
                const area = cells.length;
                const perimeter = calculatePerimeter(cells, symbol);
                sum += area * perimeter;
            }
        }
    }

    return sum;
};
