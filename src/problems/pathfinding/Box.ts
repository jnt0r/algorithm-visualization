import Rectangle from '../../display/components/Rectangle';

export default class Box extends Rectangle {
    cost = -1;
    visited = false;

    constructor(readonly ax: number, readonly ay: number) {
        super(ax * 21, ay * 21, 20, 20);
        this.setColor('#FFF');
        this.setBorderColor('#000');
        this.onClick(() => {
            this.element.fill('#000');
            this.visited = true;
        });
    }

    markVisited(): void {
        this.visited = true;
        this.element.fill('#0FF');
    }

    markPartOfPath(): void {
        this.element.fill('#00F');
    }

    markStart(): void {
        this.element.fill('#F00');
    }

    markGoal(): void {
        this.element.fill('#0F0');
    }
}
