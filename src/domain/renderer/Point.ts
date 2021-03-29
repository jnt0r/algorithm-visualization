export default class Point {
    constructor(private readonly x: number, private readonly y: number) {
        if (x < 0 || y < 0) {
            throw new Error('IllegalArgument: Coordinates must be positive but got: ' + x);
        }
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    /**
     * Returns euclidean distance to given point
     * @param point
     */
    euclideanDistanceTo(point: Point): number {
        const dx = Math.pow(this.x - point.getX(), 2);
        const dy = Math.pow(this.y - point.getY(), 2);

        return Math.sqrt(dx + dy);
    }

    manhattanDistanceTo(point: Point): number {
        const dx = Math.abs(this.x - point.x);
        const dy = Math.abs(this.y - point.y);

        return dx + dy;
    }
}
