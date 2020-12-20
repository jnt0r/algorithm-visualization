import GridBox from './GridBox';
import Renderer from '../../renderer/Renderer';
import Point from '../../renderer/Point';

export default class Grid {
    private readonly boxes: GridBox[][] = [];
    public start: GridBox;
    public goal: GridBox;

    constructor(readonly width: number, readonly height: number, private readonly renderer: Renderer) {
        for (let x = 0; x < width; x++) {
            this.boxes[x] = [];
            for (let y = 0; y < height; y++) {
                this.boxes[x][y] = new GridBox(x, y);
            }
        }

        // Set start
        this.start = this.boxes[Math.floor(Math.random() * width)][Math.floor(Math.random() * height)];
        this.start.setStart();

        // Set goal
        this.goal = this.boxes[Math.floor(Math.random() * width)][Math.floor(Math.random() * height)];
        this.goal.setGoal();
    }

    render(): void {
        this.renderer.clear();
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const component = this.renderer.createRectangle(
                    new Point(this.boxes[x][y].ax * 20, this.boxes[x][y].ay * 20),
                    19,
                    19,
                );
                component.setColor(this.boxes[x][y].getColor());
                component.setBorderColor(this.boxes[x][y].getBorderColor());
                this.renderer.render(component);
            }
        }
    }

    getElement(x: number, y: number): GridBox | undefined {
        if (this.boxes[x] && this.boxes[x][y]) {
            return this.boxes[x][y];
        }

        return undefined;
    }

    reset(): void {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const box = this.boxes[x][y];
                if (box !== this.start && box !== this.goal) {
                    box.unmark();
                }
                box.reset();
            }
        }
    }

    async renderAnimated(): Promise<void> {
        this.render();

        return this.renderer.animate();
    }
}
