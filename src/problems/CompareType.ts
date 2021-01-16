// This should simulate an enum. Typescript does not support enums with function yet
// so I tricked a bit and simulate an enum with an interface.

export default interface CompareType {
    compare(a: number, b: number): boolean;
}

export const GREATER: CompareType = {
    compare(a: number, b: number): boolean {
        return a > b;
    },
};

export const GREATER_EQUAL: CompareType = {
    compare(a: number, b: number): boolean {
        return a >= b;
    },
};

export const LESS: CompareType = {
    compare(a: number, b: number): boolean {
        return a < b;
    },
};

export const LESS_EQUAL: CompareType = {
    compare(a: number, b: number): boolean {
        return a <= b;
    },
};

export const EQUAL: CompareType = {
    compare(a: number, b: number): boolean {
        return a === b;
    },
};
