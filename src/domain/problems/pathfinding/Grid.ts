import GridBox from './GridBox';
import PathFindingProblemStats from './PathFindingProblemStats';
import Renderer from '../../renderer/Renderer';
import Point from '../../renderer/Point';

export default class Grid {
    private readonly boxes: GridBox[][] = [];
    private stats = new PathFindingProblemStats();
    private firstTimeRendering = true;

    public readonly start: GridBox;
    public readonly goal: GridBox;

    constructor(
      readonly width: number,
      readonly height: number,
      private readonly renderer: Renderer,
    ) {
        this.generatePlainGrid();

        this.start = this.getRandomElement();
        this.start.markStart();

        this.goal = this.getRandomElement();
        this.goal.markGoal();
    }

    reset(): void {
        this.firstTimeRendering = true;
        this.stats = new PathFindingProblemStats();

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.boxes[x][y].reset();
            }
        }
    }

    render(): void {
        // for (let x = 0; x < this.width; x++) {
        //     for (let y = 0; y < this.height; y++) {
        //         const box = this.boxes[x][y];
        //
        //         if (this.firstTimeRendering) {
        //             // this.renderer.render(box.getComponent());
        //         }
        //         box.render();
        //     }
        // }
        // this.firstTimeRendering = false;
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
            this.stats.addCheckedField();

            return this.boxes[x][y];
        }

        return undefined;
    }

    visitField(field: GridBox): void {
        field.markVisited();
        this.getStats().addVisitedField();
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

    private generatePlainGrid() {
        for (let x = 0; x < this.width; x++) {
            this.boxes[x] = [];
            for (let y = 0; y < this.height; y++) {
                this.boxes[x][y] = new GridBox(new Point(x, y), this.renderer);
            }
        }
    }

    private getRandomElement() {
        return this.boxes[Math.floor(Math.random() * this.width)][Math.floor(Math.random() * this.height)];
    }

    private addElementIfExistsAndValid(x: number, y: number, neighbours: GridBox[]): void {
        const element = this.getElement(x, y);
        if (element && !element.isWall()) {
            neighbours.push(element);
        }
    }
}
