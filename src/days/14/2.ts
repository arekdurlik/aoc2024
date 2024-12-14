import { Expected, Part } from '../../../types.ts';

export const expectedValue: Expected = undefined;

export const solve: Part = (input) => {
    const robots = input.split('\r\n').map((v) =>
        v.split(' ').map((v) => v.substring(2).split(',').map((v) => +v))
    );
    const width = Math.max(...robots.map((v) => v[0][0])) + 1;
    const height = Math.max(...robots.map((v) => v[0][1])) + 1;

    for (let i = 0; i < 10000; i++) {
        if (isTree()) {
            return i;
        }

        for (let j = 0; j < robots.length; j++) {
            const x = robots[j][0][0];
            const y = robots[j][0][1];
            const vx = robots[j][1][0];
            const vy = robots[j][1][1];

            robots[j][0][0] = (x + vx + width) % width;
            robots[j][0][1] = (y + vy + height) % height;
        }
    }

    function isTree() {
        const robotsSet = new Set();

        for (let i = 0; i < robots.length; i++) {
            const [[x, y]] = robots[i];
            robotsSet.add(`${x},${y}`);
        }

        return robotsSet.size === robots.length;
    }

    return NaN;
};
