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
            // If goal element was checked in last iteration, draw path
            if (lastLayer.indexOf(this.grid.goal) !== -1) {
                return this.constructPath();
            }

            const nextLayer: GridBox[] = [];
            for (const box of lastLayer) {
                grid.getNeighboursOfElement(box).forEach((neighbour) =>
                    this.processBox(nextLayer, neighbour, box.getCost() + 1),
                );
            }
            await this.grid.renderAnimated();
            lastLayer = nextLayer;
        }
        // When reaching here, there was no path found
        throw new Error('No path found');
    }

    processBox(o: GridBox[], element: GridBox, cost: number): void {
        if (!element.isVisited()) {
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
            current = this.getBestNeighbour(current);
            current.markPartOfPath();
            await this.grid.renderAnimated();
        }
    }

    private getBestNeighbour(element: GridBox): GridBox {
        return this.grid
            .getNeighboursOfElement(element)
            .filter((a) => a.getCost() != -1)
            .sort((a, b) => (a.getCost() < b.getCost() ? -1 : 1))[0];
    }
}
