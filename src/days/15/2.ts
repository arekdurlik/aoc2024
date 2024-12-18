import { Expected, Part } from '../../../types.ts';

export const expectedValue: Expected = 9021;

enum Cell {
    ROBOT = '@',
    WALL = '#',
    EMPTY = '.',
    OLD_BOX = 'O',
    BOX_LEFT = '[',
    BOX_RIGHT = ']',
}

export const solve: Part = function (input) {
    const [gridInput, moves] = input.split('\r\n\r\n');
    const grid = remapGrid(gridInput.split('\r\n').map((row) => row.split('')));
    let position = locateRobot();

    function remapGrid(grid: string[][]) {
        return grid.map((row) =>
            row.flatMap((cell) => {
                if (cell === Cell.OLD_BOX) return [Cell.BOX_LEFT, Cell.BOX_RIGHT];
                if (cell === Cell.ROBOT) return [Cell.ROBOT, Cell.EMPTY];
                return [cell, cell];
            })
        );
    }

    function locateRobot() {
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y][x] === Cell.ROBOT) {
                    return [y, x];
                }
            }
        }
        return [-1, -1];
    }

    function swap(y1: number, x1: number, y2: number, x2: number) {
        [grid[y1][x1], grid[y2][x2]] = [grid[y2][x2], grid[y1][x1]];
    }

    function isWall(y: number, x: number) {
        return grid[y][x] === Cell.WALL;
    }

    function isEmpty(y: number, x: number) {
        return grid[y][x] === Cell.EMPTY;
    }

    function moveVertical(dy: number, dx: number) {
        const nextCell = [position[0] + dy, position[1] + dx];
        let toMove: number[][] = [];
        let blocked = false;

        if (isWall(nextCell[0], nextCell[1])) return;

        function check(y: number, x: number) {
            const currentCell = grid[y][x];
            const nextCell = grid[y + dy][x + dx];

            if (nextCell !== Cell.WALL) {
                if (currentCell === Cell.BOX_LEFT) {
                    toMove.push([y, x]);
                    toMove.push([y, x + 1]);
                } else if (currentCell === Cell.BOX_RIGHT) {
                    toMove.push([y, x]);
                    toMove.push([y, x - 1]);
                }
            }

            if (nextCell === Cell.WALL) {
                blocked = true;
                return;
            } else if (nextCell === Cell.EMPTY) {
                return;
            } else {
                if (
                    (currentCell === Cell.BOX_LEFT && nextCell === Cell.BOX_LEFT) ||
                    (currentCell === Cell.BOX_RIGHT && nextCell === Cell.BOX_RIGHT)
                ) {
                    check(y + dy, x);
                } else if (nextCell === Cell.BOX_LEFT) {
                    check(y + dy, x);
                    check(y + dy, x + 1);
                } else if (nextCell === Cell.BOX_RIGHT) {
                    check(y + dy, x);
                    check(y + dy, x - 1);
                }
            }
        }

        check(position[0], position[1]);

        if (blocked) return;

        // remove duplicates and sort
        toMove = Array.from(
            new Set(toMove.map((v) => JSON.stringify(v))),
            (v) => JSON.parse(v),
        ).sort((a, b) => a[0] - b[0]);

        if (dy > 0) {
            for (let i = toMove.length - 1; i >= 0; i--) {
                swap(toMove[i][0], toMove[i][1], toMove[i][0] + 1, toMove[i][1]);
            }
        } else {
            for (let i = 0; i < toMove.length; i++) {
                swap(toMove[i][0], toMove[i][1], toMove[i][0] - 1, toMove[i][1]);
            }
        }

        grid[position[0]][position[1]] = Cell.EMPTY;
        position = [position[0] + dy, position[1]];
        grid[position[0]][position[1]] = Cell.ROBOT;
    }

    function moveHorizontal(dy: number, dx: number) {
        const nextCell = [position[0] + dy, position[1] + dx];
        const toMove = [];

        while (grid[nextCell[0]][nextCell[1]] !== Cell.WALL) {
            toMove.push([nextCell[0], nextCell[1]]);
            if (isEmpty(nextCell[0], nextCell[1])) {
                break;
            }
            nextCell[0] += dy;
            nextCell[1] += dx;
        }

        if (isWall(nextCell[0], nextCell[1])) return;

        if (dx > 0) {
            for (let i = toMove.length - 1; i >= 0; i--) {
                grid[toMove[i][0]][toMove[i][1]] = grid[toMove[i][0]][toMove[i][1] - 1];
            }
        } else {
            toMove.reverse();
            for (let i = 0; i < toMove.length; i++) {
                grid[toMove[i][0]][toMove[i][1]] = grid[toMove[i][0]][toMove[i][1] + 1];
            }
        }

        grid[position[0]][position[1]] = Cell.EMPTY;
        position = [position[0], position[1] + dx];
    }

    for (let i = 0; i < moves.length; i++) {
        switch (moves[i]) {
            case '^':
                moveVertical(-1, 0);
                break;
            case '>':
                moveHorizontal(0, 1);
                break;
            case 'v':
                moveVertical(1, 0);
                break;
            case '<':
                moveHorizontal(0, -1);
                break;
        }
    }

    return grid.reduce((acc, row, i) => {
        return acc + row.reduce((acc, cell, j) => {
            return acc + (cell === Cell.BOX_LEFT ? (100 * i) + j : 0);
        }, 0);
    }, 0);
};
