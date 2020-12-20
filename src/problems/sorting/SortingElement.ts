export default class SortingElement {
    private readonly defaultColor = '#58B7FF';
    private sorted = false;
    private color = this.defaultColor;

    constructor(private readonly value: number) {}

    isSorted(): boolean {
        return this.sorted;
    }

    getColor(): string {
        return this.color;
    }

    setColor(hexCode: string): void {
        this.color = hexCode;
    }

    markComparing(): void {
        this.setColor('#FF4949');
    }

    markPivot(): void {
        this.setColor('#7f00ff');
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

    getValue(): number {
        return this.value;
    }
}
