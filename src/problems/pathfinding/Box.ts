import Rectangle from '../../renderer/components/Rectangle';

export default class Box extends Rectangle {
    private visited = false;
    private start = false;
    private goal = false;
    private cost = Number.MAX_VALUE;

    constructor(readonly ax: number, readonly ay: number) {
        super(ax * 21, ay * 21, 20, 20);
        this.setColor('#FFF');
        this.setBorderColor('#000');

        this.onMouseOver((ev) => {
            if (ev.buttons === 1) {
                this.setWall();
            }
            if (ev.buttons === 2) {
                this.visited = false;
                this.unmark();
            }
        });
    }

    setCost(cost: number): void {
        this.cost = cost;
    }

    // @Override
    setColor(hexCode: string): void {
        if (!this.start && !this.goal) {
            super.setColor(hexCode);
        }
    }

    markVisited(): void {
        this.visited = true;
        this.setColor('#0FF');
    }

    markPartOfPath(): void {
        this.setColor('#00F');
    }

    setStart(): void {
        this.setColor('#F00');
        this.start = true;
    }

    setGoal(): void {
        this.setColor('#0F0');
        this.goal = true;
    }

    unmark(): void {
        this.setColor('#FFF');
        this.setBorderColor('#000');
    }

    setWall(): void {
        this.visited = true;
        this.setColor('#000');
    }

    isVisited(): boolean {
        return this.visited;
    }

    getCost(): number {
        return this.cost;
    }

    setVisited(): void {
        this.visited = true;
    }

    reset(): void {
        this.cost = Number.MAX_VALUE;
        this.visited = false;
    }
}
