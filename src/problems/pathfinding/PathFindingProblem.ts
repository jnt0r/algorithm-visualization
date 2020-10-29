import Renderer from '../../display/Renderer';
import { Element, Rect } from '@svgdotjs/svg.js';
import { Problem } from '../Problem';

export class Box {
    readonly element: Element;
    cost = -1;
    visited = false;

    constructor(readonly x: number, readonly y: number) {
        this.element = new Rect()
            .size(40, 40)
            .move(x * 41, y * 41)
            .fill('#FFF')
            .stroke('#000');
    }

    markVisited(): void {
        this.visited = true;
        this.element.fill('#0FF');
    }

    markPartOfPath(): void {
        this.element.fill('#00F');
    }
}

export class Grid {
    private readonly boxes: Box[][] = [];
    private start: Box;
    private goal: Box;

    constructor(readonly renderer: Renderer, readonly width: number, readonly height: number) {
        for (let x = 0; x < width; x++) {
            this.boxes[x] = [];
            for (let y = 0; y < height; y++) {
                this.boxes[x][y] = new Box(x, y);

                renderer.display(this.boxes[x][y].element);
            }
        }

        // Set start
        this.start = this.boxes[Math.floor(Math.random() * width)][Math.floor(Math.random() * height)];
        this.start.element.fill('#F00');

        // Set goal
        this.goal = this.boxes[Math.floor(Math.random() * width)][Math.floor(Math.random() * height)];
        this.goal.element.fill('#0F0');
    }

    async solve(): Promise<void> {
        this.start.cost = 0;
        this.start.visited = true;

        let lastLayer: Box[] = [this.start];
        while (lastLayer.indexOf(this.goal) === -1) {
            const nextLayer: Box[] = [];
            await new Promise((resolve) => {
                for (const box of lastLayer) {
                    this.processBox(nextLayer, box.x + 1, box.y, box.cost + 1);
                    this.processBox(nextLayer, box.x - 1, box.y, box.cost + 1);
                    this.processBox(nextLayer, box.x, box.y + 1, box.cost + 1);
                    this.processBox(nextLayer, box.x, box.y - 1, box.cost + 1);
                }
                window.requestAnimationFrame(function () {
                    setTimeout(() => {
                        resolve();
                    }, 300);
                });
            });
            lastLayer = nextLayer;
        }

        this.goal.element.fill('#0F0');

        let dot = this.goal;
        while (dot.cost !== 1) {
            await new Promise((resolve) => {
                dot = this.getBestNeighbour(dot.x, dot.y);
                dot.markPartOfPath();

                window.requestAnimationFrame(function () {
                    setTimeout(() => {
                        resolve();
                    }, 300);
                });
            });
        }
    }

    processBox(o: Box[], x: number, y: number, cost: number): void {
        if (this.boxes[x] && this.boxes[x][y] && !this.boxes[x][y].visited) {
            this.boxes[x][y].markVisited();
            this.boxes[x][y].cost = cost;

            if (o.indexOf(this.boxes[x][y]) === -1) {
                o.push(this.boxes[x][y]);
            }
            // this.renderer.display(new Text().text(cost + '').amove(x * 41 + 15, y * 41 + 15));
        }
    }

    private getBestNeighbour(x: number, y: number) {
        const neighbours = [];
        if (this.boxes[x + 1]) neighbours.push(this.boxes[x + 1][y]);
        if (this.boxes[x - 1]) neighbours.push(this.boxes[x - 1][y]);
        if (this.boxes[x][y - 1]) neighbours.push(this.boxes[x][y - 1]);
        if (this.boxes[x][y + 1]) neighbours.push(this.boxes[x][y + 1]);
        return neighbours.filter((a) => a.cost != -1).sort((a, b) => (a.cost < b.cost ? -1 : 1))[0];
    }
}

export default class PathFindingProblem implements Problem {
    private grid: Grid;

    getAlgorithms(): string[] {
        return ['Dijkstra', 'A*', 'Depth first', 'Breath first'];
    }

    async solve(renderer: Renderer): Promise<void> {
        return this.grid.solve();
    }

    render(renderer: Renderer): void {
        renderer.clear();
        this.grid = new Grid(renderer, 37, 18);
    }

    generate(): void {
        console.log('generate');
    }
}
