import PathFindingProblemSolver from '../PathFindingProblemSolver';
import Grid from '../Grid';
import GridBox from '../GridBox';

export default class Dijkstra implements PathFindingProblemSolver {
    private grid!: Grid;

    async solve(grid: Grid): Promise<void> {
        this.grid = grid;
        grid.start.setCost(0);
        grid.start.markVisited();

        let lastLayer: GridBox[] = [this.grid.start];
        while (lastLayer.length > 0) {
            if (lastLayer.indexOf(this.grid.goal) !== -1) {
                return this.constructPath();
            }

            const nextLayer: GridBox[] = [];
            for (const box of lastLayer) {
                this.processBox(nextLayer, box.ax + 1, box.ay, box.getCost() + 1);
                this.processBox(nextLayer, box.ax - 1, box.ay, box.getCost() + 1);
                this.processBox(nextLayer, box.ax, box.ay + 1, box.getCost() + 1);
                this.processBox(nextLayer, box.ax, box.ay - 1, box.getCost() + 1);
            }
            await this.grid.renderAnimated();
            lastLayer = nextLayer;
        }
        throw new Error('No path found');
    }

    processBox(o: GridBox[], x: number, y: number, cost: number): void {
        const element = this.grid.getElement(x, y);
        if (element && !element.isVisited()) {
            element.markVisited();
            element.setCost(cost);

            if (o.indexOf(element) === -1) {
                o.push(element);
            }
        }
    }

    private async constructPath() {
        let current = this.grid.goal;
        while (current.getCost() !== 1) {
            current = this.getBestNeighbour(current.ax, current.ay);
            current.markPartOfPath();
            await this.grid.renderAnimated();
        }
    }

    private getBestNeighbour(x: number, y: number): GridBox {
        const neighbours: GridBox[] = [];
        if (this.grid.getElement(x + 1, y)) neighbours.push(<GridBox>this.grid.getElement(x + 1, y));
        if (this.grid.getElement(x - 1, y)) neighbours.push(<GridBox>this.grid.getElement(x - 1, y));
        if (this.grid.getElement(x, y - 1)) neighbours.push(<GridBox>this.grid.getElement(x, y - 1));
        if (this.grid.getElement(x, y + 1)) neighbours.push(<GridBox>this.grid.getElement(x, y + 1));

        return neighbours.filter((a) => a.getCost() != -1).sort((a, b) => (a.getCost() < b.getCost() ? -1 : 1))[0];
    }
}
