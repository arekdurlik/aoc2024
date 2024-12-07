export function generateCombinations(symbols: string[], count: number) {
    let combinations = [''];

    for (let i = 0; i < count; i++) {
        combinations = combinations.flatMap(combination =>
            symbols.map(symbol => combination + symbol)
        );
    }

    return combinations;
}
