import Point from '../../../src/domain/renderer/Point';

describe('Point', () => {
    describe('euclideanDistanceTo', () => {
        test('should return 0 on same Points', () => {
            const pointA = new Point(1, 2);
            const pointB = new Point(1, 2);

            expect(pointA.euclideanDistanceTo(pointB)).toBe(0);
            expect(pointB.euclideanDistanceTo(pointA)).toBe(0);
        });

        test('distance between point and origin', () => {
            const pointA = new Point(0, 0);
            const pointB = new Point(3, 4);

            expect(pointA.euclideanDistanceTo(pointB)).toBe(5);
            expect(pointB.euclideanDistanceTo(pointA)).toBe(5);
        });

        test('distance between negative point and origin', () => {
            const pointA = new Point(0, 0);
            const pointB = new Point(-3, -4);

            expect(pointA.euclideanDistanceTo(pointB)).toBe(5);
            expect(pointB.euclideanDistanceTo(pointA)).toBe(5);
        });

        test('distance between two points', () => {
            const pointA = new Point(15, 3);
            const pointB = new Point(9, 21);

            expect(pointA.euclideanDistanceTo(pointB)).toBeCloseTo(18.97, 2);
            expect(pointB.euclideanDistanceTo(pointA)).toBeCloseTo(18.97, 2);
        });
    });

    describe('manhattanDistanceTo', () => {
        test('should return 0 on same Points', () => {
            const pointA = new Point(1, 2);
            const pointB = new Point(1, 2);

            expect(pointA.manhattanDistanceTo(pointB)).toBe(0);
            expect(pointB.manhattanDistanceTo(pointA)).toBe(0);
        });

        test('distance between point and origin', () => {
            const pointA = new Point(0, 0);
            const pointB = new Point(3, 4);

            expect(pointA.manhattanDistanceTo(pointB)).toBe(7);
            expect(pointB.manhattanDistanceTo(pointA)).toBe(7);
        });

        test('distance between negative point and origin', () => {
            const pointA = new Point(0, 0);
            const pointB = new Point(-3, -4);

            expect(pointA.manhattanDistanceTo(pointB)).toBe(7);
            expect(pointB.manhattanDistanceTo(pointA)).toBe(7);
        });

        test('distance between two points', () => {
            const pointA = new Point(15, 3);
            const pointB = new Point(9, 21);

            expect(pointA.manhattanDistanceTo(pointB)).toBe(24);
            expect(pointB.manhattanDistanceTo(pointA)).toBe(24);
        });
    });
});
