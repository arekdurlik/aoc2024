export function getValidNumberPair(str: string) {
    const numbers = str.split(',').map((v) => +v);

    if (numbers.length === 2 && numbers.every((v) => !isNaN(v))) {
        return numbers as [number, number];
    } else throw Error('Invalid input');
}

export function hasDoInstruction(str: string): boolean {
    return str.includes('do()');
}

export function hasDontInstruction(str: string): boolean {
    return str.includes("don't()");
}
