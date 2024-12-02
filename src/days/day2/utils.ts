function isIncreasing(list: number[]) {
    return list.every((v, i) => i === 0 || v > list[i - 1]);
}

function isDecreasing(list: number[]) {
    return list.every((v, i) => i === 0 || v < list[i - 1]);
}

export function isMonotonic(list: number[]) {
    return isIncreasing(list) || isDecreasing(list);
}

export function hasValidDifferences(list: number[]) {
    return list.every((_, i) => {
        if (i === 0) return true;

        const diff = Math.abs(list[i] - list[i - 1]);
        return diff >= 1 && diff <= 3;
    });
}
