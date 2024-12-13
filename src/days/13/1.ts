import { Expected, Part } from '../../../types.ts';

export const expectedValue: Expected = 480;

type Point = {
    x: number;
    y: number;
};

function getData(round: string[]): { a: Point; b: Point; p: Point } {
    const a = {
        x: parseInt(round[0].split(' ')[2].substring(2)),
        y: parseInt(round[0].split(' ')[3].substring(2)),
    };

    const b = {
        x: parseInt(round[1].split(' ')[2].substring(2)),
        y: parseInt(round[1].split(' ')[3].substring(2)),
    };

    const p = {
        x: parseInt(round[2].split(' ')[1].substring(2)),
        y: parseInt(round[2].split(' ')[2].substring(2)),
    };

    return { a, b, p };
}

export const solve: Part = (input) => {
    const rounds = input.split('\r\n\r\n').map((v) => v.split('\r\n'));

    function findOptimal(
        { a, b, p }: {
            a: Point;
            b: Point;
            p: Point;
        },
    ) {
        const MAX_PRESSES = 100;
        let cost = Infinity;

        for (let pA = 0; pA < MAX_PRESSES; pA++) {
            for (let pB = 0; pB < MAX_PRESSES; pB++) {
                const totalX = pA * a.x + pB * b.x;
                const totalY = pA * a.y + pB * b.y;
                const curCost = pA * 3 + pB;

                if (totalX === p.x && totalY === p.y && curCost < cost) {
                    cost = curCost;
                }
            }
        }

        return cost === Infinity ? 0 : cost;
    }

    return rounds.reduce(
        (acc, round) => acc + findOptimal(getData(round)),
        0,
    );
};
