import Renderer from '../display/Renderer';
import { Element, Rect } from '@svgdotjs/svg.js';

export class Box {
    readonly element: Element;
    cost = -1;
    visited = false;

    constructor(readonly x: number, readonly y: number) {
        this.element = new Rect().size(40, 40).move(x, y).fill('#FFF').stroke('#000');
    }
}

export class Grid {
    private readonly boxes: Box[][] = [];

    constructor(readonly renderer: Renderer, readonly a: number, readonly b: number) {
        for (let i = 0; i < a; i++) {
            this.boxes[i] = [];
            for (let j = 0; j < b; j++) {
                this.boxes[i][j] = new Box(i * 41, j * 41);

                if (i === 5 && j === 10) {
                    this.boxes[i][j].element.fill('#0F0');
                }

                if (i === 9 && j === 1) {
                    this.boxes[i][j].element.fill('#F00');
                }

                renderer.display(this.boxes[i][j].element);
            }
        }

        const o = [this.boxes[5][10]];
        while (o.indexOf(this.boxes[9][1]) === -1) {
            for (const box of o.filter((el) => !el.visited)) {
                box.cost = this.getDistance(box.x / 41, box.y / 41);
                this.process(o, box.x / 41 + 1, box.y / 41);
                this.process(o, box.x / 41 - 1, box.y / 41);
                this.process(o, box.x / 41, box.y / 41 + 1);
                this.process(o, box.x / 41, box.y / 41 - 1);
                this.boxes[box.x / 41][box.y / 41].visited = true;
            }
            console.log(o);
        }

        this.boxes[5][10].element.fill('#F00');
        this.boxes[9][1].element.fill('#F00');

        let box = o[0];
        while (box != undefined && box !== this.boxes[9][1]) {
            box.element.fill('#00F');
            box = this.getBestNeighbour(box.x / 41, box.y / 41);
        }
        this.boxes[5][10].element.fill('#0F0');
        this.boxes[9][1].element.fill('#F00');
    }

    process(o: Box[], i: number, j: number): void {
        if (i >= 0 && j >= 0 && i < this.a && j < this.b) {
            this.boxes[i][j].element.fill('#0FF');
            o.push(this.boxes[i][j]);
        }
    }

    getDistance(i: number, j: number): number {
        return Math.abs(9 - i) + Math.abs(1 - j);
    }

    private getBestNeighbour(x: number, y: number) {
        const neighbours = [this.boxes[x + 1][y], this.boxes[x - 1][y], this.boxes[x][y - 1], this.boxes[x][y + 1]];
        return neighbours.filter((a) => a.cost != -1).sort((a, b) => (a.cost < b.cost ? -1 : 1))[0];
    }
}

export default class PathFindingProblem {
    readonly grid: Grid;

    constructor(renderer: Renderer) {
        this.grid = new Grid(renderer, 16, 16);
        this.generate();
    }

    async solve(renderer: Renderer): Promise<void> {}

    render(renderer: Renderer) {}

    generate() {}
}
