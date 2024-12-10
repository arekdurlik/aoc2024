import { Expected, Part } from '../../../types.ts';

export const expectedValue: Expected = 36;
type Cell = [number, number];

export const solve: Part = (input) => {
    const grid = input.split('\r\n').map((row) => row.split(''));
    const trailheads: Cell[] = [];
    const nines = new Map<number, Cell[]>();

    function navigateTrail(trailhead: number, cell: Cell) {
        const validDirections = getValidDirections(cell);

        if (isNine(cell)) {
            const cellsAtTrailhead = nines.get(trailhead) || [];
            if (!cellsAtTrailhead.some(([x, y]) => x === cell[0] && y === cell[1])) {
                nines.set(trailhead, [...cellsAtTrailhead, cell]);
            }
            return;
        }

        validDirections.forEach((nextCell) => navigateTrail(trailhead, nextCell));
    }

    function getValidDirections([x, y]: Cell): Cell[] {
        const currentValue = +grid[x][y];
        const directions: Cell[] = [
            [x + 1, y],
            [x, y + 1],
            [x - 1, y],
            [x, y - 1],
        ];
        return directions.filter(
            ([nx, ny]) => isInBounds([nx, ny]) && +grid[nx][ny] === currentValue + 1,
        );
    }

    function isInBounds([x, y]: Cell) {
        return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length;
    }

    function isNine([x, y]: Cell) {
        return +grid[x][y] === 9;
    }

    // get trailheads
    grid.forEach((row, i) =>
        row.forEach((value, j) => {
            if (value === '0') trailheads.push([i, j]);
        })
    );

    // start navigating
    trailheads.forEach((trailhead, index) => {
        navigateTrail(index, trailhead);
    });

    return Array
        .from(nines.values())
        .reduce((sum, cells) => sum + cells.length, 0);
};
