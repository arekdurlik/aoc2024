import { Expected, Part } from '../../../types.ts';

export const expectedValue: Expected = 1928;

export const solve: Part = (input) => {
    const EMPTY_SLOT = '.';
    const blocks: (string | number)[] = [];
    let id = 0;

    // get blocks
    for (let i = 0; i < input.length; i++) {
        const size = +input[i];
        const fillValue = i % 2 === 0 ? id++ : EMPTY_SLOT;

        for (let j = 0; j < size; j++) {
            blocks.push(fillValue);
        }
    }

    // move blocks
    for (let i = blocks.length - 1; i > 0; i--) {
        if (blocks[i] === EMPTY_SLOT) continue;

        const id = blocks[i];
        for (let j = 0; j < i; j++) {
            if (blocks[j] === EMPTY_SLOT) {
                blocks[i] = EMPTY_SLOT;
                blocks[j] = id;
                break;
            }
        }
    }

    // calculate checksum
    let checksum = 0;
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i] !== EMPTY_SLOT) {
            checksum += +blocks[i] * i;
        }
    }

    return checksum;
};
