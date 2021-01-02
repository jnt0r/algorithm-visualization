export default class GridBox {
    private readonly borderColor = '#000';
    private readonly defaultColor = '#FFF';
    private color = this.defaultColor;

    private cost = Number.MAX_VALUE;
    private visited = false;
    private start = false;
    private goal = false;

    constructor(readonly ax: number, readonly ay: number) {}

    getColor(): string {
        return this.color;
    }

    getBorderColor(): string {
        return this.borderColor;
    }

    setCost(cost: number): void {
        this.cost = cost;
    }

    setColor(hexCode: string): void {
        if (!this.start && !this.goal) {
            this.color = hexCode;
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
        this.setColor(this.defaultColor);
        // this.setBorderColor('#000');
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
