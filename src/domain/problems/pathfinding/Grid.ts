import GridBox from './GridBox';
import PathFindingProblemStats from './PathFindingProblemStats';
import Component from '../../renderer/Component';
import Renderer from '../../renderer/Renderer';
import Point from '../../renderer/Point';

export default class Grid {
    private readonly boxes: GridBox[][] = [];
    private readonly components: Component[][] = [];
    private stats = new PathFindingProblemStats();
    private firstTimeRendering = true;

    public readonly start: GridBox;
    public readonly goal: GridBox;

    constructor(readonly width: number, readonly height: number, private readonly renderer: Renderer) {
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
        for (let x = 0; x < this.width; x++) {
            if (this.firstTimeRendering) {
                this.components[x] = [];
            }

            for (let y = 0; y < this.height; y++) {
                const box = this.boxes[x][y];

                let component: Component;
                if (this.firstTimeRendering) {
                    component = this.renderer.createRectangle(
                        new Point(box.point.getX() * 20, box.point.getY() * 20),
                        20,
                        20,
                    );
                    component.onClick(() => {
                        box.setWall();
                        component.setColor(box.getColor());
                        component.setBorderColor(box.getBorderColor());
                    });
                    component.onRightClick(() => {
                        box.removeWall();
                        component.setColor(box.getColor());
                        component.setBorderColor(box.getBorderColor());
                    });
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
                    this.renderer.render(component);
                } else {
                    component = this.components[x][y];
                }

                component.setColor(box.getColor());
                component.setBorderColor(box.getBorderColor());
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

    renderPathPart(part: GridBox): Promise<void> {
        this.components[part.point.getX()][part.point.getY()].setColor(part.getColor());
        this.components[part.point.getX()][part.point.getY()].setBorderColor(part.getBorderColor());

        return new Promise(resolve => {
            window.requestAnimationFrame(() => resolve());
        });
    }

    private generatePlainGrid() {
        for (let x = 0; x < this.width; x++) {
            this.boxes[x] = [];
            for (let y = 0; y < this.height; y++) {
                this.boxes[x][y] = new GridBox(new Point(x, y));
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
