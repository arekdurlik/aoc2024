export type Day = {
    part1TestExpectedValue?: number;
    part2TestExpectedValue?: number;
    part1: Part;
    part2: Part;
};

export type Part = (input: string) => number;
