import PathFindingProblemSolver from '../PathFindingProblemSolver';
import Renderer from '../../../renderer/Renderer';
import Grid from '../Grid';
import Box from '../Box';

export default class Dijkstra implements PathFindingProblemSolver {
    private grid!: Grid;

    async solve(grid: Grid, renderer: Renderer): Promise<void> {
        this.grid = grid;
        grid.start.cost = 0;
        grid.start.visited = true;

        let lastLayer: Box[] = [grid.start];
        while (lastLayer.indexOf(grid.goal) === -1) {
            const nextLayer: Box[] = [];
            await renderer.animate(() => {
                for (const box of lastLayer) {
                    this.processBox(nextLayer, box.ax + 1, box.ay, box.cost + 1);
                    this.processBox(nextLayer, box.ax - 1, box.ay, box.cost + 1);
                    this.processBox(nextLayer, box.ax, box.ay + 1, box.cost + 1);
                    this.processBox(nextLayer, box.ax, box.ay - 1, box.cost + 1);
                }
            });
            lastLayer = nextLayer;
        }

        grid.goal.markGoal();

        let dot = grid.goal;
        while (dot.cost !== 1) {
            await renderer.animate(() => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                dot = this.getBestNeighbour(dot.ax, dot.ay);
                dot.markPartOfPath();
            });
        }
    }

    processBox(o: Box[], x: number, y: number, cost: number): void {
        const element = this.grid.getElement(x, y);
        if (element && !element.visited) {
            element.markVisited();
            element.cost = cost;

            if (o.indexOf(element) === -1) {
                o.push(element);
            }
            // this.renderer.renderer(new Text().text(cost + '').amove(x * 41 + 15, y * 41 + 15));
        }
    }

    private getBestNeighbour(x: number, y: number): Box | undefined {
        const neighbours: Box[] = [];
        if (this.grid.getElement(x + 1, y)) neighbours.push(<Box>this.grid.getElement(x + 1, y));
        if (this.grid.getElement(x - 1, y)) neighbours.push(<Box>this.grid.getElement(x - 1, y));
        if (this.grid.getElement(x, y - 1)) neighbours.push(<Box>this.grid.getElement(x, y - 1));
        if (this.grid.getElement(x, y + 1)) neighbours.push(<Box>this.grid.getElement(x, y + 1));
        return neighbours.filter((a) => a.cost != -1).sort((a, b) => (a.cost < b.cost ? -1 : 1))[0];
    }
}
