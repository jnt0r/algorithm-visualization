import Point from '../../src/renderer/Point';

describe('Point', () => {
    describe('euclideanDistanceTo', () => {
        test('euclideanDistanceTo should return 0 on same Points', () => {
            const pointA = new Point(1, 2);
            const pointB = new Point(1, 2);

            expect(pointA.euclideanDistanceTo(pointB)).toBe(0);
            expect(pointB.euclideanDistanceTo(pointA)).toBe(0);
        });

        test('euclideanDistanceTo should return euclidean distance #2', () => {
            const pointA = new Point(0, 0);
            const pointB = new Point(3, 4);

            expect(pointA.euclideanDistanceTo(pointB)).toBe(5);
            expect(pointB.euclideanDistanceTo(pointA)).toBe(5);
        });

        test('euclideanDistanceTo should return euclidean distance #3', () => {
            const pointA = new Point(0, 0);
            const pointB = new Point(-3, -4);

            expect(pointA.euclideanDistanceTo(pointB)).toBe(5);
            expect(pointB.euclideanDistanceTo(pointA)).toBe(5);
        });

        test('euclideanDistanceTo should return euclidean distance #4', () => {
            const pointA = new Point(15, 3);
            const pointB = new Point(9, 21);

            expect(pointA.euclideanDistanceTo(pointB)).toBeCloseTo(18.97, 2);
            expect(pointB.euclideanDistanceTo(pointA)).toBeCloseTo(18.97, 2);
        });
    });

    describe('manhattanDistanceTo', () => {
        test('manhattanDistanceTo should return 0 on same Points', () => {
            const pointA = new Point(1, 2);
            const pointB = new Point(1, 2);

            expect(pointA.manhattanDistanceTo(pointB)).toBe(0);
            expect(pointB.manhattanDistanceTo(pointA)).toBe(0);
        });

        test('manhattanDistanceTo should return manhattan distance #2', () => {
            const pointA = new Point(0, 0);
            const pointB = new Point(3, 4);

            expect(pointA.manhattanDistanceTo(pointB)).toBe(7);
            expect(pointB.manhattanDistanceTo(pointA)).toBe(7);
        });

        test('manhattanDistanceTo should return manhattan distance #3', () => {
            const pointA = new Point(0, 0);
            const pointB = new Point(-3, -4);

            expect(pointA.manhattanDistanceTo(pointB)).toBe(7);
            expect(pointB.manhattanDistanceTo(pointA)).toBe(7);
        });

        test('manhattanDistanceTo should return manhattan distance #4', () => {
            const pointA = new Point(15, 3);
            const pointB = new Point(9, 21);

            expect(pointA.manhattanDistanceTo(pointB)).toBe(24);
            expect(pointB.manhattanDistanceTo(pointA)).toBe(24);
        });
    });
});
