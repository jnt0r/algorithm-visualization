import Box from './Box';
import Renderer from '../../renderer/Renderer';

export default class Grid {
    private readonly boxes: Box[][] = [];
    public start: Box;
    public goal: Box;

    constructor(readonly width: number, readonly height: number, private readonly renderer: Renderer) {
        for (let x = 0; x < width; x++) {
            this.boxes[x] = [];
            for (let y = 0; y < height; y++) {
                this.boxes[x][y] = new Box(x, y, renderer);
            }
        }

        // Set start
        this.start = this.boxes[Math.floor(Math.random() * width)][Math.floor(Math.random() * height)];
        this.start.setStart();

        // Set goal
        this.goal = this.boxes[Math.floor(Math.random() * width)][Math.floor(Math.random() * height)];
        this.goal.setGoal();
    }

    render(renderer: Renderer): void {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.boxes[x][y].render(renderer);
            }
        }
    }

    getElement(x: number, y: number): Box | undefined {
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
}
