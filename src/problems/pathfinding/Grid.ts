import Box from './Box';
import Renderer from '../../renderer/Renderer';

export default class Grid {
    private readonly boxes: Box[][] = [];
    public start: Box;
    public goal: Box;

    constructor(readonly width: number, readonly height: number) {
        for (let x = 0; x < width; x++) {
            this.boxes[x] = [];
            for (let y = 0; y < height; y++) {
                this.boxes[x][y] = new Box(x, y);
            }
        }

        // Set start
        this.start = this.boxes[Math.floor(Math.random() * width)][Math.floor(Math.random() * height)];
        this.start.markStart();

        // Set goal
        this.goal = this.boxes[Math.floor(Math.random() * width)][Math.floor(Math.random() * height)];
        this.goal.markGoal();
    }

    render(renderer: Renderer): void {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                renderer.render(this.boxes[x][y]);
            }
        }
    }

    getElement(x: number, y: number): Box | undefined {
        if (this.boxes[x] && this.boxes[x][y]) {
            return this.boxes[x][y];
        }
        return undefined;
    }
}
