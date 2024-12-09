import { Expected, Part } from '../../../types.ts';

export const expectedValue: Expected = 2858;

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
    let failedId = -1;

    for (let i = blocks.length - 1; i > 0; i--) {
        if (blocks[i] === failedId || blocks[i] === EMPTY_SLOT) continue;

        const id = blocks[i] as number;
        let fileSize = 1;

        while (i - fileSize >= 0 && blocks[i - fileSize] === id) {
            fileSize++;
        }

        let freeSlotStart = -1;

        for (let j = 0; j < i; j++) {
            if (blocks[j] !== EMPTY_SLOT) continue;

            let slotSize = 1;
            while (blocks[j + slotSize] === EMPTY_SLOT) slotSize++;

            if (slotSize >= fileSize) {
                freeSlotStart = j;
                break;
            }
        }

        if (freeSlotStart === -1) {
            failedId = id;
            continue;
        }

        for (let j = 0; j < fileSize; j++) {
            blocks[i - j] = EMPTY_SLOT;
            blocks[freeSlotStart + j] = id;
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
