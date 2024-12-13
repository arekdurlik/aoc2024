import { Expected, Part } from '../../../types.ts';

export const expectedValue: Expected = 875318608908;

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
        x: parseInt(round[2].split(' ')[1].substring(2)) + 10000000000000,
        y: parseInt(round[2].split(' ')[2].substring(2)) + 10000000000000,
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
        const mat = [
            [a.x, b.x],
            [a.y, b.y],
        ];

        const det = mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0];

        if (det === 0) {
            return 0;
        }

        const detX = p.x * mat[1][1] - p.y * mat[0][1];
        const detY = mat[0][0] * p.y - mat[1][0] * p.x;

        const x = detX / det;
        const y = detY / det;

        if (x % 1 === 0 && y % 1 === 0) {
            return x * 3 + y;
        }

        return 0;
    }

    return rounds.reduce(
        (acc, round) => acc + findOptimal(getData(round)),
        0,
    );
};
