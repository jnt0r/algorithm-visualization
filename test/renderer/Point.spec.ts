import Point from '../../src/renderer/Point';

describe('Point', () => {
    test('distanceTo should return 0 on same Points', () => {
        const pointA = new Point(1, 2);
        const pointB = new Point(1, 2);

        expect(pointA.distanceTo(pointB)).toBe(0);
        expect(pointB.distanceTo(pointA)).toBe(0);
    });

    test('distanceTo should return euclidean distance #2', () => {
        const pointA = new Point(0, 0);
        const pointB = new Point(3, 4);

        expect(pointA.distanceTo(pointB)).toBe(5);
        expect(pointB.distanceTo(pointA)).toBe(5);
    });

    test('distanceTo should return euclidean distance #3', () => {
        const pointA = new Point(0, 0);
        const pointB = new Point(-3, -4);

        expect(pointA.distanceTo(pointB)).toBe(5);
        expect(pointB.distanceTo(pointA)).toBe(5);
    });

    test('distanceTo should return euclidean distance #4', () => {
        const pointA = new Point(15, 3);
        const pointB = new Point(9, 21);

        expect(pointA.distanceTo(pointB)).toBeCloseTo(18.97, 2);
        expect(pointB.distanceTo(pointA)).toBeCloseTo(18.97, 2);
    });
});
