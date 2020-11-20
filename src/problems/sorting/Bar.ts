import Rectangle from '../../renderer/components/Rectangle';
import Point from '../../renderer/Point';

export default class Bar extends Rectangle {
    private readonly defaultColor = '#58B7FF';
    private sorted = false;

    constructor(private readonly id: number, private readonly value: number) {
        super(Point.create(100 + id * 25, 100), 20, value);
        this.setColor(this.defaultColor);
    }

    markRed(): void {
        this.setColor('#FF4949');
    }

    setSorted(): void {
        this.sorted = true;
        this.setColor('#13CE66');
    }

    unmark(): void {
        if (!this.sorted) {
            this.setColor(this.defaultColor);
        } else {
            this.setSorted();
        }
    }

    getId(): number {
        return this.id;
    }

    getValue(): number {
        return this.value;
    }
}
