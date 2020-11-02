import Box from './Box';
import Renderer from '../../renderer/Renderer';

export default class Grid {
    private readonly boxes: Box[][] = [];
    private start: Box;
    private goal: Box;

    constructor(readonly renderer: Renderer, readonly width: number, readonly height: number) {
        for (let x = 0; x < width; x++) {
            this.boxes[x] = [];
            for (let y = 0; y < height; y++) {
                this.boxes[x][y] = new Box(x, y);

                renderer.render(this.boxes[x][y]);
            }
        }

        // Set start
        this.start = this.boxes[Math.floor(Math.random() * width)][Math.floor(Math.random() * height)];
        this.start.markStart();

        // Set goal
        this.goal = this.boxes[Math.floor(Math.random() * width)][Math.floor(Math.random() * height)];
        this.goal.markGoal();
    }

    async solve(): Promise<void> {
        this.start.cost = 0;
        this.start.visited = true;

        let lastLayer: Box[] = [this.start];
        while (lastLayer.indexOf(this.goal) === -1) {
            const nextLayer: Box[] = [];
            await new Promise((resolve) => {
                for (const box of lastLayer) {
                    this.processBox(nextLayer, box.ax + 1, box.ay, box.cost + 1);
                    this.processBox(nextLayer, box.ax - 1, box.ay, box.cost + 1);
                    this.processBox(nextLayer, box.ax, box.ay + 1, box.cost + 1);
                    this.processBox(nextLayer, box.ax, box.ay - 1, box.cost + 1);
                }
                window.requestAnimationFrame(function () {
                    setTimeout(() => {
                        resolve();
                    }, 300);
                });
            });
            lastLayer = nextLayer;
        }

        this.goal.markGoal();

        let dot = this.goal;
        while (dot.cost !== 1) {
            await new Promise((resolve) => {
                dot = this.getBestNeighbour(dot.ax, dot.ay);
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
            // this.renderer.renderer(new Text().text(cost + '').amove(x * 41 + 15, y * 41 + 15));
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
