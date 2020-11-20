export default class Point {
    private constructor(private readonly x: number, private readonly y: number) {}

    public static create(x: number, y: number): Point {
        return new Point(x, y);
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }
}
