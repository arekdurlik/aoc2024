import { Expected, Part } from '../../../types.ts';

export const expectedValue: Expected = 55312;

export const solve: Part = (input) => {
    const stones = input.split(' ');
    const maxCount = 25;

    let blinks = 0;
    while (blinks < maxCount) {
        for (let i = 0; i < stones.length; i++) {
            const value = +stones[i];

            if (value === 0) {
                stones[i] = '1';
            } else if (stones[i].length % 2 === 0) {
                const split = [
                    stones[i].substring(0, stones[i].length / 2),
                    stones[i].substring(stones[i].length / 2),
                ];
                stones.splice(i, 1, ...split.map((v) => (+v).toString()));
                i++;
            } else {
                stones[i] = (value * 2024).toString();
            }
        }

        blinks++;
    }

    return stones.length;
};
