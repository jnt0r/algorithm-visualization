import GridBox from './GridBox';
import Renderer from '../../renderer/Renderer';
import Point from '../../renderer/Point';
import PathFindingProblemStats from './PathFindingProblemStats';
import Rectangle from '../../renderer/components/Rectangle';

export default class Grid {
    private readonly boxes: GridBox[][] = [];
    private readonly components: Rectangle[][] = [];
    private firstTimeRendering = true;
    private stats = new PathFindingProblemStats();
    public start: GridBox;
    public goal: GridBox;

    constructor(readonly width: number, readonly height: number, private readonly renderer: Renderer) {
        for (let x = 0; x < width; x++) {
            this.boxes[x] = [];
            for (let y = 0; y < height; y++) {
                this.boxes[x][y] = new GridBox(new Point(x, y));
            }
        }

        // Set start
        this.start = this.boxes[Math.floor(Math.random() * width)][Math.floor(Math.random() * height)];
        this.start.markStart();

        // Set goal
        this.goal = this.boxes[Math.floor(Math.random() * width)][Math.floor(Math.random() * height)];
        this.goal.markGoal();
    }

    reset(): void {
        this.stats = new PathFindingProblemStats();
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.boxes[x][y].reset();
            }
        }
    }

    render(): void {
        for (let x = 0; x < this.width; x++) {
            if (this.firstTimeRendering) {
                this.components[x] = [];
            }

            for (let y = 0; y < this.height; y++) {
                const box = this.boxes[x][y];

                let component: Rectangle;
                if (this.firstTimeRendering) {
                    component = this.renderer.createRectangle(
                        new Point(box.point.getX() * 20, box.point.getY() * 20),
                        20,
                        20,
                    );
                    component.onMouseOver(({ leftMouseButton, rightMouseButton }) => {
                        if (leftMouseButton) {
                            box.setWall();
                        }
                        if (rightMouseButton) {
                            box.removeWall();
                        }
                        component.setColor(box.getColor());
                        component.setBorderColor(box.getBorderColor());
                    });
                    this.components[x].push(component);
                } else {
                    component = this.components[x][y];
                }

                component.setColor(box.getColor());
                component.setBorderColor(box.getBorderColor());
                this.renderer.render(component);
            }
        }
        this.firstTimeRendering = false;
    }

    renderAnimated(): Promise<void> {
        this.render();

        return this.renderer.animate();
    }

    getStats(): PathFindingProblemStats {
        return this.stats;
    }

    getElement(x: number, y: number): GridBox | undefined {
        if (this.boxes[x] && this.boxes[x][y]) {
            this.stats.addVisitedField();

            return this.boxes[x][y];
        }

        return undefined;
    }

    /**
     * Returns all <b>valid</b> Neighbours of the given element.
     *
     * @param element
     */
    getNeighboursOfElement(element: GridBox): GridBox[] {
        const neighbours: GridBox[] = [];
        const point = element.point;
        this.addElementIfExistsAndValid(point.getX() + 1, point.getY(), neighbours);
        this.addElementIfExistsAndValid(point.getX() - 1, point.getY(), neighbours);
        this.addElementIfExistsAndValid(point.getX(), point.getY() - 1, neighbours);
        this.addElementIfExistsAndValid(point.getX(), point.getY() + 1, neighbours);

        return neighbours;
    }

    private addElementIfExistsAndValid(x: number, y: number, neighbours: GridBox[]): void {
        const element = this.getElement(x, y);
        if (element && !element.isWall()) {
            neighbours.push(element);
        }
    }
}
