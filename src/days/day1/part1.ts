import { Part } from '../../types';

export const part1TestExpectedValue = 11;

export const part1: Part = input => {
    const numbers = input
        .split('\r\n')
        .map(v => v.split('   '))
        .map(pair => pair.map(Number));

    let firstList: number[] = [];
    let secondList: number[] = [];

    numbers.forEach(([first, second]) => {
        firstList.push(first);
        secondList.push(second);
    });

    firstList.sort((a, b) => a - b);
    secondList.sort((a, b) => a - b);

    let total = 0;

    for (let i = 0; i < firstList.length; i++) {
        total += Math.abs(firstList[i] - secondList[i]);
    }
    return total;
};
