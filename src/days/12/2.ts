import { Expected, Part } from '../../../types.ts';

export const expectedValue: Expected = 1206;

type Cell = [number, number];

export const solve: Part = (input) => {
    const grid = input.split('\r\n').map((row) => row.split(''));
    const visited = grid.map((row) => row.map(() => false));
    const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];

    let sum = 0;

    function inBounds(y: number, x: number): boolean {
        return y >= 0 && y < grid.length && x >= 0 && x < grid[0].length;
    }

    function getBounds(cells: Cell[]): [number[], number[]] {
        let topLeft: [number, number] = [Infinity, Infinity];
        let bottomRight: [number, number] = [-Infinity, -Infinity];

        for (const [y, x] of cells) {
            topLeft = [Math.min(topLeft[0], y), Math.min(topLeft[1], x)];
            bottomRight = [Math.max(bottomRight[0], y), Math.max(bottomRight[1], x)];
        }

        return [topLeft, bottomRight];
    }

    function floodFill(x: number, y: number, symbol: string): Cell[] {
        const queue: Cell[] = [[y, x]];
        const cells: Cell[] = [];

        while (queue.length > 0) {
            const [cy, cx] = queue.shift()!;
            if (visited[cy][cx]) continue;

            visited[cy][cx] = true;
            cells.push([cy, cx]);

            for (const [dy, dx] of directions) {
                const ny = cy + dy;
                const nx = cx + dx;

                if (
                    inBounds(nx, ny) &&
                    grid[ny][nx] === symbol &&
                    !visited[ny][nx]
                ) {
                    queue.push([ny, nx]);
                }
            }
        }

        return cells;
    }

    function calculatePerimeter(cells: Cell[], symbol: string): number {
        cells.sort((a, b) => a[0] - b[0]);
        let perimeter = 0;
        const [topLeft, bottomRight] = getBounds(cells);

        function isValidCell(y: number, x: number): boolean {
            return cells.some(([cy, cx]) => cy === y && cx === x);
        }

        // horizontal
        for (let y = topLeft[0]; y <= bottomRight[0]; y++) {
            let topEdge = false;
            let bottomEdge = false;

            for (let x = topLeft[1]; x <= bottomRight[1]; x++) {
                if (
                    grid[y][x] !== symbol ||
                    !isValidCell(y, x)
                ) {
                    topEdge = bottomEdge = false;
                    continue;
                }

                if (grid[y - 1]?.[x] !== symbol) {
                    if (!topEdge) {
                        topEdge = true;
                        perimeter++;
                    }
                } else {
                    topEdge = false;
                }

                if (grid[y + 1]?.[x] !== symbol) {
                    if (!bottomEdge) {
                        bottomEdge = true;
                        perimeter++;
                    }
                } else {
                    bottomEdge = false;
                }
            }
        }

        // vertical
        for (let x = topLeft[1]; x <= bottomRight[1]; x++) {
            let leftEdge = false;
            let rightEdge = false;

            for (let y = topLeft[0]; y <= bottomRight[0]; y++) {
                if (
                    grid[y][x] !== symbol ||
                    !isValidCell(y, x)
                ) {
                    leftEdge = rightEdge = false;
                    continue;
                }

                if (grid[y]?.[x - 1] !== symbol) {
                    if (!leftEdge) {
                        leftEdge = true;
                        perimeter++;
                    }
                } else {
                    leftEdge = false;
                }

                if (grid[y]?.[x + 1] !== symbol) {
                    if (!rightEdge) {
                        rightEdge = true;
                        perimeter++;
                    }
                } else {
                    rightEdge = false;
                }
            }
        }

        return perimeter;
    }

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (!visited[y][x]) {
                const symbol = grid[y][x];
                const cells = floodFill(x, y, symbol);
                const area = cells.length;
                const perimeter = calculatePerimeter(cells, symbol);
                sum += area * perimeter;
            }
        }
    }

    return sum;
};
