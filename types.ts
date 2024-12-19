export enum Mode {
    TEST = 'test',
    FULL = 'full',
}

export type PartModule = {
    expectedValue?: number | string;
    solve: (input: string) => number | string;
};

export type Part = PartModule['solve'];
export type Expected = PartModule['expectedValue'];
