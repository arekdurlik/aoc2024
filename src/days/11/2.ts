import { Expected, Part } from '../../../types.ts';

export const expectedValue: Expected = 65601038650482;

export const solve: Part = (input) => {
    const stones = input.split(' ').map((v) => +v);
    const maxCount = 75;
    const stoneCounts = new Map<number, number>(); // value, count

    function inc(map: Map<number, number>, key: number, count = 1) {
        map.set(key, (map.get(key) || 0) + count);
    }

    for (const stone of stones) {
        inc(stoneCounts, stone);
    }

    let blinks = 0;
    while (blinks < maxCount) {
        const nextCounts = new Map<number, number>();

        for (const [value, count] of stoneCounts.entries()) {
            if (value === 0) {
                inc(nextCounts, 1, count);
            } else if (value.toString().length % 2 === 0) {
                const str = value.toString();

                const [l, r] = [
                    +str.substring(0, str.length / 2),
                    +str.substring(str.length / 2),
                ];

                inc(nextCounts, l, count);
                inc(nextCounts, r, count);
            } else {
                inc(nextCounts, value * 2024, count);
            }
        }

        stoneCounts.clear();

        for (const [value, count] of nextCounts) {
            stoneCounts.set(value, count);
        }

        blinks++;
    }

    return Array.from(stoneCounts.values()).reduce((a, b) => a + b, 0);
};
