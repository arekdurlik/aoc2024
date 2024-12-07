import { Part } from '../../types';
import { green } from '../../utils';

export const part2TestExpectedValue = 6;

export const part2: Part = input => {
    let guard = '^';
    const obstacle = '#';
    const visited = 'X';

    let initialGrid = input.split('\r\n').map(v => v.split(''));
    let grid = structuredClone(initialGrid);
    let width = grid[0].length;
    let height = grid.length;

    let initialPosition: [number, number] = getInitialPosition();
    let position: [number, number] = [0, 0];
    let direction: [number, number] = [0, -1];
    let validObstacles = 0;

    function getInitialPosition(): [number, number] {
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (grid[i][j] === guard) {
                    return [j, i];
                }
            }
        }
        return [0, 0];
    }

    function positionInGrid(pos: [number, number]) {
        return pos[0] >= 0 && pos[0] < width && pos[1] >= 0 && pos[1] < height;
    }

    function turnRight() {
        if (direction[1] === -1) {
            direction = [1, 0];
        } else if (direction[0] === 1) {
            direction = [0, 1];
        } else if (direction[1] === 1) {
            direction = [-1, 0];
        } else if (direction[0] === -1) {
            direction = [0, -1];
        }
    }

    function obstacleInTheWay(x: number, y: number, direction: number[]) {
        if (direction[1] === -1 && position[1] > 0) {
            return grid[y - 1][x] === obstacle;
        } else if (direction[0] === 1 && position[0] < width - 1) {
            return grid[y][x + 1] === obstacle;
        } else if (direction[1] === 1 && position[1] < height - 1) {
            return grid[y + 1][x] === obstacle;
        } else if (direction[0] === -1 && position[0] > 0) {
            return grid[y][x - 1] === obstacle;
        }
        return false;
    }

    function move() {
        if (obstacleInTheWay(position[0], position[1], direction)) {
            turnRight();
            return true;
        } else {
            const newPosition: [number, number] = [
                position[0] + direction[0],
                position[1] + direction[1],
            ];

            if (positionInGrid(newPosition)) {
                if (position[0] === initialPosition[0] && position[1] === initialPosition[1]) {
                    grid[position[1]][position[0]] = green(visited);
                } else {
                    grid[position[1]][position[0]] = visited;
                }

                position = newPosition;
                return true;
            } else {
                return false;
            }
        }
    }

    function placeObstacle(position: [number, number]) {
        if (isInitialPosition(position) || isObstacle(position)) {
            return false;
        }

        grid[position[1]][position[0]] = obstacle;
        return true;
    }

    function run() {
        let moves = 0;
        position = [...initialPosition];
        direction = [0, -1];

        // yeah...
        while (true) {
            if (moves > 20000) {
                validObstacles++;
                break;
            }

            if (move()) {
                moves++;
            } else {
                break;
            }
        }
    }

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            grid = structuredClone(initialGrid);
            const placed = placeObstacle([j, i]);

            if (placed) {
                run();
            }
        }
    }

    return validObstacles;

    function isInitialPosition(position: [number, number]) {
        return position[0] === initialPosition[0] && position[1] === initialPosition[1];
    }

    function isObstacle(position: [number, number]) {
        return grid[position[1]][position[0]] === obstacle;
    }
};
