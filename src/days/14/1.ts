import { Expected, Part } from '../../../types.ts';

export const expectedValue: Expected = 12;

export const solve: Part = (input) => {
    const robots = input.split('\r\n').map((v) =>
        v.split(' ').map((v) => v.substring(2).split(',').map((v) => +v))
    );
    const width = Math.max(...robots.map((v) => v[0][0])) + 1;
    const height = Math.max(...robots.map((v) => v[0][1])) + 1;

    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < robots.length; j++) {
            const x = robots[j][0][0];
            const y = robots[j][0][1];
            const vx = robots[j][1][0];
            const vy = robots[j][1][1];

            robots[j][0][0] = (x + vx + width) % width;
            robots[j][0][1] = (y + vy + height) % height;
        }
    }

    function getSafetyFactor() {
        const quarters = [0, 0, 0, 0];

        const quarterWidth = Math.floor(width / 2);
        const quarterHeight = Math.floor(height / 2);

        for (let j = 0; j < robots.length; j++) {
            const x = robots[j][0][0];
            const y = robots[j][0][1];

            if (x < quarterWidth && y < quarterHeight) {
                quarters[0]++;
            } else if (x > quarterWidth && y < quarterHeight) {
                quarters[1]++;
            } else if (x < quarterWidth && y > quarterHeight) {
                quarters[2]++;
            } else if (x > quarterWidth && y > quarterHeight) {
                quarters[3]++;
            }
        }

        return quarters.reduce((acc, v) => acc * v, 1);
    }

    return getSafetyFactor();
};
