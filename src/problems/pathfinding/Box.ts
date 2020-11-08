import Rectangle from '../../renderer/components/Rectangle';

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
        this.setColor('#0FF');
    }

    markPartOfPath(): void {
        this.setColor('#00F');
    }

    markStart(): void {
        this.setColor('#F00');
    }

    markGoal(): void {
        this.setColor('#0F0');
    }

    unmark(): void {
        this.setColor('#FFF');
        this.setBorderColor('#000');
    }
}
