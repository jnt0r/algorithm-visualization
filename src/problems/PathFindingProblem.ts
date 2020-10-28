import Renderer from '../display/Renderer';
import { Element, Rect } from '@svgdotjs/svg.js';

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
}

export class Grid {
    private readonly boxes: Box[][] = [];
    private start: Box;
    private goal: Box;

    constructor(readonly renderer: Renderer, readonly width: number, readonly height: number) {
        for (let i = 0; i < width; i++) {
            this.boxes[i] = [];
            for (let j = 0; j < height; j++) {
                this.boxes[i][j] = new Box(i, j);

                renderer.display(this.boxes[i][j].element);
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
        const o: Box[] = [this.start];
        let layer: Box[] = [this.start];
        while (layer.indexOf(this.goal) === -1) {
            const newlayer: Box[] = [];
            await new Promise((resolve) => {
                console.log(layer);
                for (const box of layer) {
                    this.boxes[box.x][box.y].cost = this.getDistance(box.x, box.y);
                    this.boxes[box.x][box.y].visited = true;
                    this.process(newlayer, box.x + 1, box.y);
                    this.process(newlayer, box.x - 1, box.y);
                    this.process(newlayer, box.x, box.y + 1);
                    this.process(newlayer, box.x, box.y - 1);
                }

                // Wait for the transition to end!
                window.requestAnimationFrame(function () {
                    setTimeout(() => {
                        resolve();
                    }, 1);
                });
            });
            layer = [];
            layer.push(...newlayer);
            o.push(...newlayer);
        }

        this.start.element.fill('#F00');
        this.goal.element.fill('#0F0');
        this.goal.cost = 0;

        let box = o[0];
        while (box != undefined && box !== this.goal && box.cost !== 0) {
            await new Promise((resolve) => {
                box.element.fill('#00F');
                box = this.getBestNeighbour(box.x, box.y);
                // this.renderer.display(new Text().move(box.x + 20, box.y + 20).text('' + box.cost));

                // Wait for the transition to end!
                window.requestAnimationFrame(function () {
                    setTimeout(() => {
                        resolve();
                    }, 1);
                });
            });
        }

        this.start.element.fill('#F00');
        this.goal.element.fill('#0F0');
    }

    process(o: Box[], i: number, j: number): void {
        if (this.boxes[i] && this.boxes[i][j] && !this.boxes[i][j].visited) {
            this.boxes[i][j].element.fill('#0FF');
            o.push(this.boxes[i][j]);
        }
    }

    getDistance(i: number, j: number): number {
        return Math.abs(this.goal.x - i) + Math.abs(this.goal.y - j);
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

export default class PathFindingProblem {
    private grid: Grid;

    constructor(private readonly renderer: Renderer) {
        this.generate();
    }

    async solve(renderer: Renderer): Promise<void> {
        return this.grid.solve();
    }

    render(renderer: Renderer) {}

    generate() {
        this.renderer.clear();
        this.grid = new Grid(this.renderer, 37, 18);
    }
}
