import Rectangle from '../../renderer/components/Rectangle';

export default class Bar extends Rectangle {
    private readonly defaultColor = '#58B7FF';

    constructor(private readonly id: number, private readonly value: number) {
        super(100 + id * 25, 100, 20, value);
        this.setColor(this.defaultColor);
    }

    markRed(): void {
        this.setColor('#FF4949');
    }

    markGreen(): void {
        this.setColor('#13CE66');
    }

    unmark(): void {
        this.setColor(this.defaultColor);
    }

    getId(): number {
        return this.id;
    }

    getValue(): number {
        return this.value;
    }
}
