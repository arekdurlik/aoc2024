import { Expected, Part } from '../../../types.ts';

export const expectedValue: Expected = 31;

export const solve: Part = (input) => {
    const numbers = input
        .split('\r\n')
        .map((v) => v.split('   '))
        .map((pair) => pair.map(Number));

    const firstList: number[] = [];
    const secondList: number[] = [];

    numbers.forEach(([first, second]) => {
        firstList.push(first);
        secondList.push(second);
    });

    firstList.sort((a, b) => a - b);
    secondList.sort((a, b) => a - b);

    const similarities = new Map<number, number>();

    let similarityScore = 0;

    for (let i = 0; i < firstList.length; i++) {
        const first = firstList[i];

        if (similarities.has(first)) {
            similarityScore += similarities.get(first) ?? 0;
        } else {
            let multiplier = 0;
            for (let j = 0; j < secondList.length; j++) {
                const second = secondList[j];
                if (first === second) {
                    multiplier++;
                }
            }
            const value = first * multiplier;

            similarities.set(first, value);
            similarityScore += value;
        }
    }

    return similarityScore;
};
