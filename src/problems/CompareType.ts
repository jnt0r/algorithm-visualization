export enum CompareType {
    '>',
    '>=',
    '<',
    '<=',
    '=',
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CompareType {
    export function compare(a: number, b: number, compareType: CompareType): boolean {
        switch (compareType) {
            case CompareType['>']:
                return a > b;
            case CompareType['>=']:
                return a >= b;
            case CompareType['<']:
                return a < b;
            case CompareType['<=']:
                return a <= b;
            case CompareType['=']:
                return a === b;
        }
    }
}
