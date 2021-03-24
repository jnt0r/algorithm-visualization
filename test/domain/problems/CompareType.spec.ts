import { EQUAL, GREATER, GREATER_EQUAL, LESS, LESS_EQUAL } from '../../../src/domain/problems/CompareType';

describe('CompareType', () => {
    describe('EQUAL', () => {
        test('1 = 2 is false', () => {
            expect(EQUAL.compare(1, 2)).toBeFalsy();
        });
        test('1 = 1 is true', () => {
            expect(EQUAL.compare(1, 1)).toBeTruthy();
        });
    });

    describe('LESS', () => {
        test('1 < 2 is true', () => {
            expect(LESS.compare(1, 2)).toBeTruthy();
        });
        test('2 < 1 is false', () => {
            expect(LESS.compare(2, 1)).toBeFalsy();
        });
        test('1 < 1 is false', () => {
            expect(LESS.compare(1, 1)).toBeFalsy();
        });
    });

    describe('LESS_EQUAL', () => {
        test('1 <= 2 is true', () => {
            expect(LESS_EQUAL.compare(1, 2)).toBeTruthy();
        });
        test('2 <= 1 is false', () => {
            expect(LESS_EQUAL.compare(2, 1)).toBeFalsy();
        });
        test('1 <= 1 is true', () => {
            expect(LESS_EQUAL.compare(1, 1)).toBeTruthy();
        });
    });

    describe('GREATER', () => {
        test('2 > 1 is true', () => {
            expect(GREATER.compare(2, 1)).toBeTruthy();
        });
        test('1 > 2 is false', () => {
            expect(GREATER.compare(1, 2)).toBeFalsy();
        });
        test('1 > 1 is false', () => {
            expect(GREATER.compare(1, 1)).toBeFalsy();
        });
    });

    describe('GREATER_EQUAL', () => {
        test('2 >= 1 is true', () => {
            expect(GREATER_EQUAL.compare(2, 1)).toBeTruthy();
        });
        test('1 >= 2 is false', () => {
            expect(GREATER_EQUAL.compare(1, 2)).toBeFalsy();
        });
        test('1 >= 1 is true', () => {
            expect(GREATER_EQUAL.compare(1, 1)).toBeTruthy();
        });
    });
});
