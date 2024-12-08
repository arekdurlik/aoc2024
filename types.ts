export enum Mode {
    TEST = 'test',
    FULL = 'full',
}

export type PartModule = {
    expectedValue?: number;
    solve: (input: string) => number;
};

export type Part = PartModule['solve'];
export type Expected = PartModule['expectedValue'];
