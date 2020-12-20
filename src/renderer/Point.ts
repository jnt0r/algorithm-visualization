export default class Point {
    constructor(private readonly x: number, private readonly y: number) {}

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }
}
