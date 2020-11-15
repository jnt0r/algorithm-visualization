import PathFindingProblemSolver from '../PathFindingProblemSolver';
import Renderer from '../../../renderer/Renderer';
import Grid from '../Grid';
import Box from '../Box';

export default class Dijkstra implements PathFindingProblemSolver {
    private grid!: Grid;
    private renderer!: Renderer;

    async solve(grid: Grid, renderer: Renderer): Promise<void> {
        this.grid = grid;
        this.renderer = renderer;
        grid.start.setCost(0);
        grid.start.setVisited();

        let lastLayer: Box[] = [this.grid.start];
        while (lastLayer.length > 0) {
            if (lastLayer.indexOf(this.grid.goal) !== -1) {
                await this.constructPath();
                return;
            }

            const nextLayer: Box[] = [];
            await renderer.animate(() => {
                for (const box of lastLayer) {
                    this.processBox(nextLayer, box.ax + 1, box.ay, box.getCost() + 1);
                    this.processBox(nextLayer, box.ax - 1, box.ay, box.getCost() + 1);
                    this.processBox(nextLayer, box.ax, box.ay + 1, box.getCost() + 1);
                    this.processBox(nextLayer, box.ax, box.ay - 1, box.getCost() + 1);
                }
            });
            lastLayer = nextLayer;
        }
        throw new Error('No path found');
    }

    private async constructPath() {
        let current = this.grid.goal;
        while (current.getCost() !== 1) {
            await this.renderer.animate(() => {
                current = this.getBestNeighbour(current.ax, current.ay);
                current.markPartOfPath();
            });
        }
    }

    processBox(o: Box[], x: number, y: number, cost: number): void {
        const element = this.grid.getElement(x, y);
        if (element && !element.isVisited()) {
            element.markVisited();
            element.setCost(cost);

            if (o.indexOf(element) === -1) {
                o.push(element);
            }
        }
    }

    private getBestNeighbour(x: number, y: number): Box {
        const neighbours: Box[] = [];
        if (this.grid.getElement(x + 1, y)) neighbours.push(<Box>this.grid.getElement(x + 1, y));
        if (this.grid.getElement(x - 1, y)) neighbours.push(<Box>this.grid.getElement(x - 1, y));
        if (this.grid.getElement(x, y - 1)) neighbours.push(<Box>this.grid.getElement(x, y - 1));
        if (this.grid.getElement(x, y + 1)) neighbours.push(<Box>this.grid.getElement(x, y + 1));
        return neighbours.filter((a) => a.getCost() != -1).sort((a, b) => (a.getCost() < b.getCost() ? -1 : 1))[0];
    }
}
