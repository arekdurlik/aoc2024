export type Day = {
    part1: Part;
    part2: Part;
};

export type Part = (input: string) => number;
