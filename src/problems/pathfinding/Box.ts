import Rectangle from '../../renderer/components/Rectangle';
import Point from '../../renderer/Point';
import Renderable from '../../renderer/Renderable';
import Renderer from '../../renderer/Renderer';

export default class Box implements Renderable {
    private visited = false;
    private start = false;
    private goal = false;
    private cost = Number.MAX_VALUE;
    private readonly rectangle: Rectangle;

    constructor(readonly ax: number, readonly ay: number, private readonly renderer: Renderer) {
        this.rectangle = renderer.createRectangle(new Point(ax * 21, ay * 21), 20, 20);
        this.setColor('#FFF');
        this.rectangle.setBorderColor('#000');

        this.rectangle.onMouseOver((ev) => {
            if (ev.buttons === 1) {
                this.setWall();
            }
            if (ev.buttons === 2) {
                this.visited = false;
                this.unmark();
            }
        });
    }

    render(renderer: Renderer): void {
        renderer.render(this.rectangle);
    }

    setCost(cost: number): void {
        this.cost = cost;
    }

    // @Override
    setColor(hexCode: string): void {
        if (!this.start && !this.goal) {
            this.rectangle.setColor(hexCode);
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
        this.rectangle.setBorderColor('#000');
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
