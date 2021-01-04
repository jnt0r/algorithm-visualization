import GridBox from './GridBox';
import Renderer from '../../renderer/Renderer';
import Point from '../../renderer/Point';
import PathFindingProblemStats from './PathFindingProblemStats';
import Rectangle from '../../renderer/components/Rectangle';

export default class Grid {
    private readonly boxes: GridBox[][] = [];
    private stats = new PathFindingProblemStats();
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
        this.start.markStart();

        // Set goal
        this.goal = this.boxes[Math.floor(Math.random() * width)][Math.floor(Math.random() * height)];
        this.goal.markGoal();
    }

    render(): void {
        this.renderer.clear();
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const box = this.boxes[x][y];
                const component = this.renderer.createRectangle(new Point(box.ax * 20, box.ay * 20), 19, 19);
                component.onMouseOver(({ buttons }) => {
                    if (buttons === 1) {
                        box.setWall();
                    }
                    if (buttons === 2) {
                        box.removeWall();
                    }
                    component.setColor(box.getColor());
                    component.setBorderColor(box.getBorderColor());
                });
                component.setColor(box.getColor());
                component.setBorderColor(box.getBorderColor());
                this.renderer.render(component);
            }
        }
    }

    getElement(x: number, y: number): GridBox | undefined {
        if (this.boxes[x] && this.boxes[x][y]) {
            this.stats.addCheckedField();

            return this.boxes[x][y];
        }

        return undefined;
    }

    reset(): void {
        this.stats = new PathFindingProblemStats();
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.boxes[x][y].reset();
            }
        }
    }

    getStats(): PathFindingProblemStats {
        return this.stats;
    }

    renderAnimated(): Promise<void> {
        this.render();

        return this.renderer.animate();
    }
}
