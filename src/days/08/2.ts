import { Expected, Part } from '../../../types.ts';

export const expectedValue: Expected = 34;

export const solve: Part = (input) => {
    const grid = input.split('\r\n').map((v) => v.split(''));
    const positions = new Map<string, [number, number][]>();
    const antinodes = new Set<string>();

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const cell = grid[i][j];

            if (cell !== '.') {
                if (!positions.has(cell)) {
                    positions.set(cell, []);
                }
                positions.get(cell)!.push([i, j]);
            }
        }
    }

    function inGrid(x: number, y: number) {
        return x >= 0 && x < grid[0].length && y >= 0 && y < grid.length;
    }

    for (const [_, antennas] of positions) {
        for (let i = 0; i < antennas.length; i++) {
            for (let j = i + 1; j < antennas.length; j++) {
                const [y1, x1] = antennas[i];
                const [y2, x2] = antennas[j];
                const dx = x2 - x1;
                const dy = y2 - y1;

                antinodes.add(`${y1},${x1}`);
                antinodes.add(`${y2},${x2}`);

                let x = x1 - dx;
                let y = y1 - dy;

                while (inGrid(x, y)) {
                    antinodes.add(`${y},${x}`);
                    x -= dx;
                    y -= dy;
                }

                x = x2 + dx;
                y = y2 + dy;

                while (inGrid(x, y)) {
                    antinodes.add(`${y},${x}`);
                    x += dx;
                    y += dy;
                }
            }
        }
    }

    return antinodes.size;
};
