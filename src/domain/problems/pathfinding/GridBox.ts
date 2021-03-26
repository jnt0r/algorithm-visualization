import Point from '../../renderer/Point';
import Renderer from '../../renderer/Renderer';
import Rectangle from '../../renderer/components/Rectangle';

export default class GridBox {
    private readonly _defaultColor = '#FFF';
    private readonly _defaultBorderColor = '#000';
    private readonly _visitedColor = '#FF0';
    private readonly _startColor = '#F00';
    private readonly _goalColor = '#0F0';
    private readonly _pathColor = '#04d9ff';
    private readonly _wallColor = '#000';

    private borderColor = this._defaultBorderColor;
    private color = this._defaultColor;

    private cost = Number.MAX_VALUE;
    private _isVisited = false;
    private _isWall = false;
    private _isStart = false;
    private _isGoal = false;

    private readonly component: Rectangle;

    constructor(readonly point: Point, private readonly renderer: Renderer) {
        this.component = this.initializeComponent(renderer);
        this.render();
        this.renderer.render(this.component);
    }

    render(): void {
        this.component.setColor(this.color);
        this.component.setBorderColor(this.borderColor);
    }

    setCost(cost: number): void {
        this.cost = cost;
    }

    getCost(): number {
        return this.cost;
    }

    markVisited(): void {
        this._isVisited = true;
        if (!this._isGoal && !this._isStart) {
            this.setColor(this._visitedColor);
        }
    }

    markStart(): void {
        this._isStart = true;
        this.setColor(this._startColor);
    }

    markGoal(): void {
        this._isGoal = true;
        this.setColor(this._goalColor);
    }

    markPartOfPath(): void {
        this.setColor(this._pathColor);
    }

    setWall(): void {
        if (!this._isGoal && !this._isStart) {
            this._isWall = true;
            this._isVisited = true;
            this.cost = Number.MAX_VALUE;
            this.setColor(this._wallColor);
            this.setBorderColor(this._wallColor);
        }
    }

    removeWall(): void {
        if (this.isWall()) {
            this._isWall = false;
            this._isVisited = false;
            this.unmark();
        }
    }

    reset(): void {
        if (this._isWall) {
            return;
        }
        this.cost = Number.MAX_VALUE;
        this._isVisited = false;
        if (!this._isStart && !this._isGoal) {
            this.unmark();
        }
    }

    isVisited(): boolean {
        return this._isVisited;
    }

    isWall(): boolean {
        return this._isWall;
    }

    private unmark(): void {
        this.setColor(this._defaultColor);
        this.setBorderColor(this._defaultBorderColor);
    }

    private setColor(hexCode: string): void {
    // if (!this._isStart && !this._isGoal) {
        this.color = hexCode;
        // }
        this.render();
    }

    private setBorderColor(hexCode: string): void {
    // if (!this._isStart && !this._isGoal) {
        this.borderColor = hexCode;
        this.render();
    // }
    }

    private initializeComponent(renderer: Renderer): Rectangle {
        const component = renderer.createRectangle(
            new Point(this.point.getX() * 20, this.point.getY() * 20),
            20,
            20
        );

        component.onClick(() => {
            this.setWall();
            this.render();
        });
        component.onRightClick(() => {
            this.removeWall();
            this.render();
        });
        component.onMouseOver(({ leftMouseButton, rightMouseButton }) => {
            if (leftMouseButton) {
                this.setWall();
            }
            if (rightMouseButton) {
                this.removeWall();
            }
            this.render();
        });

        return component;
    }
}
