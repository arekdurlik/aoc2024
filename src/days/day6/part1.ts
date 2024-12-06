import { Part } from '../../types';
import { green } from '../../utils';

export const part1TestExpectedValue = 41;

export const part1: Part = input => {
    let guard = '^';
    const obstacle = '#';
    const visited = 'X';

    let grid = input.split('\r\n').map(v => v.split(''));
    let width = grid[0].length;
    let height = grid.length;
    let inBounds = false;

    let position: [number, number] = [0, 0];
    let direction: [number, number] = [0, -1];
    let distinctPositions = 0;

    function getInitialPosition (): [number, number] {
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (grid[i][j] === guard) {
                    inBounds = true;
                    return [j, i];
                }
            }
        }
        return [0, 0];
    }

    function positionInGrid (pos: [number, number]) {
        return pos[0] >= 0 && pos[0] < width && pos[1] >= 0 && pos[1] < height;
    }

    function turnRight () {
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

    function obstacleInTheWay (x: number, y: number, direction: number[]) {
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

    function move () {
        if (obstacleInTheWay(position[0], position[1], direction)) {
            turnRight();
        } else {
            const newPosition: [number, number] = [
                position[0] + direction[0],
                position[1] + direction[1],
            ];

            if (positionInGrid(newPosition)) {
                if (grid[position[1]][position[0]] !== visited) {
                    distinctPositions++;
                }

                if (position[0] === initialPosition[0] && position[1] === initialPosition[1]) {
                    grid[position[1]][position[0]] = green(visited);
                } else {
                    grid[position[1]][position[0]] = visited;
                }

                position = newPosition;
            } else {
                inBounds = false;
            }
        }
    }


    const initialPosition = getInitialPosition();
    position = [...initialPosition];

    let lastPosition = [...position];
    let sameMove = 0;
    while (inBounds) {
        move();

        if (position[0] === lastPosition[0] && position[1] === lastPosition[1]) {
            sameMove++;
        } else {
            sameMove = 0;
            lastPosition = [...position];
        }

        if (sameMove > 1) {
            break;
        }
    };

    return distinctPositions;
};
