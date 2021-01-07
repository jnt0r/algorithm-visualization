import Point from '../../renderer/Point';

export default class GridBox {
    private readonly defaultColor = '#FFF';
    private readonly defaultBorderColor = '#000';
    private borderColor = this.defaultBorderColor;
    private color = this.defaultColor;

    private cost = Number.MAX_VALUE;
    private _isVisited = false;
    private _isWall = false;
    private _isStart = false;
    private _isGoal = false;

    constructor(readonly point: Point) {}

    getColor(): string {
        return this.color;
    }

    getBorderColor(): string {
        return this.borderColor;
    }

    setColor(hexCode: string): void {
        if (!this._isStart && !this._isGoal) {
            this.color = hexCode;
        }
    }

    setBorderColor(hexCode: string): void {
        if (!this._isStart && !this._isGoal) {
            this.borderColor = hexCode;
        }
    }

    setCost(cost: number): void {
        this.cost = cost;
    }

    getCost(): number {
        return this.cost;
    }

    markVisited(): void {
        this._isVisited = true;
        this.setColor('#FF0');
    }

    markStart(): void {
        this.setColor('#F00');
        this.setBorderColor('#F00');
        this._isStart = true;
    }

    markGoal(): void {
        this.setColor('#0F0');
        this.setBorderColor('#0F0');
        this._isGoal = true;
    }

    markPartOfPath(): void {
        this.setColor('#04d9ff');
        this.setBorderColor('#04d9ff');
    }

    setWall(): void {
        if (!this._isGoal && !this._isStart) {
            this._isWall = true;
            this._isVisited = true;
            this.cost = Number.MAX_VALUE;
            this.setColor('#000');
            this.setBorderColor('#000');
        }
    }

    removeWall(): void {
        if (this.isWall()) {
            this._isWall = false;
            this._isVisited = false;
            this.unmark();
        }
    }

    unmark(): void {
        this.setColor(this.defaultColor);
        this.setBorderColor(this.defaultBorderColor);
    }

    reset(): void {
        if (this._isWall) {
            return;
        }
        this.cost = Number.MAX_VALUE;
        this._isVisited = false;
        this.setColor(this.defaultColor);
        this.setBorderColor(this.defaultBorderColor);
    }

    isVisited(): boolean {
        return this._isVisited;
    }

    isWall(): boolean {
        return this._isWall;
    }
}
