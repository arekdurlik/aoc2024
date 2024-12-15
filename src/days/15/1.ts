import { Expected, Part } from '../../../types.ts';

export const expectedValue: Expected = 10092;

enum Cell {
    ROBOT = '@',
    WALL = '#',
    EMPTY = '.',
    BOX = 'O',
}

export const solve: Part = (input) => {
    const [gridInput, moves] = input.split('\r\n\r\n');
    const grid = gridInput.split('\r\n').map((row) => row.split(''));
    let position = locateRobot();

    function locateRobot(): number[] {
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y][x] === Cell.ROBOT) {
                    return [y, x];
                }
            }
        }
        return [-1, -1];
    }

    function move(dy: number, dx: number) {
        const nextCell = [position[0] + dy, position[1] + dx];

        function isWall(y: number, x: number) {
            return grid[y][x] === Cell.WALL;
        }

        function isEmpty(y: number, x: number) {
            return grid[y][x] === Cell.EMPTY;
        }

        if (isWall(nextCell[0], nextCell[1])) {
            return;
        }

        const chain = [];
        let currentCell = nextCell;

        // collect boxes
        while (grid[currentCell[0]][currentCell[1]] === Cell.BOX) {
            chain.push(currentCell);
            currentCell = [currentCell[0] + dy, currentCell[1] + dx];
        }

        if (!isEmpty(currentCell[0], currentCell[1])) {
            return;
        }

        // move collected boxes forward
        for (let i = chain.length - 1; i >= 0; i--) {
            const [bx, by] = chain[i];
            grid[bx + dy][by + dx] = Cell.BOX;
            grid[bx][by] = Cell.EMPTY;
        }

        grid[nextCell[0]][nextCell[1]] = Cell.ROBOT;
        grid[position[0]][position[1]] = Cell.EMPTY;
        position = nextCell;
    }

    for (const direction of moves) {
        switch (direction) {
            case '^':
                move(-1, 0);
                break;
            case '>':
                move(0, 1);
                break;
            case 'v':
                move(1, 0);
                break;
            case '<':
                move(0, -1);
        }
    }

    return grid.reduce(
        (acc, row, i) => {
            return acc + row.reduce((acc, cell, j) => {
                return acc + (cell === Cell.BOX ? (100 * i) + j : 0);
            }, 0);
        },
        0,
    );
};
