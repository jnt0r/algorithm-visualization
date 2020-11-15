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

        await this.findPath(renderer)
            .then(() => this.constructPath(grid, renderer))
            .catch(() => alert('No path found'));
    }

    private async constructPath(grid: Grid, renderer: Renderer) {
        let current = grid.goal;
        while (current.cost !== 1) {
            await renderer.animate(() => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                current = this.getBestNeighbour(current.ax, current.ay);
                current.markPartOfPath();
            });
        }
    }

    private async findPath(renderer: Renderer) {
        let lastLayer: Box[] = [this.grid.start];
        while (lastLayer.length > 0) {
            if (lastLayer.indexOf(this.grid.goal) !== -1) {
                return;
            }
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
        throw new Error('Goal not found');
    }

    processBox(o: Box[], x: number, y: number, cost: number): void {
        const element = this.grid.getElement(x, y);
        if (element && !element.visited) {
            element.markVisited();
            element.cost = cost;

            if (o.indexOf(element) === -1) {
                o.push(element);
            }
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
