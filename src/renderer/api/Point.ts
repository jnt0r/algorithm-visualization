export default class Point {
    constructor(private readonly x: number, private readonly y: number) {}

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
