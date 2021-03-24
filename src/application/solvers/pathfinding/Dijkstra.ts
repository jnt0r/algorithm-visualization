import Grid from '../../../domain/problems/pathfinding/Grid';
import GridBox from '../../../domain/problems/pathfinding/GridBox';
import Path from '../../../domain/problems/pathfinding/Path';
import LowestCostBasedPathCalculationSolver from './LowestCostBasedPathCalculationSolver';

export default class Dijkstra extends LowestCostBasedPathCalculationSolver {
    private grid!: Grid;

    async solve(grid: Grid): Promise<Path> {
        this.grid = grid;
        grid.start.setCost(0);
        grid.start.markVisited();

        return this.calculateCostsForEachElementOfGrid().then(() => this.calculatePath(grid));
    }

    private async calculateCostsForEachElementOfGrid(): Promise<void> {
        let layer: GridBox[] = [ this.grid.start ];

        while (layer.length > 0) {
            if (this.goalWasCheckedIn(layer)) {
                return;
            }

            layer = this.calculateNextLayer(layer);
            await this.grid.renderAnimated();
        }

        throw new Error('No path found');
    }

    /**
     * Calculates costs for all neighbours of the elements in lastLayer and returns all neighbours of lastLayer elements
     *
     * @param lastLayer
     * @return All neighbours of the elements of the lastLayer
     * @private
     */
    private calculateNextLayer(lastLayer: GridBox[]): GridBox[] {
        const nextLayer: GridBox[] = [];

        lastLayer.forEach(box =>
            this.grid
                .getNeighboursOfElement(box)
                .forEach(neighbour => this.processNeighbour(neighbour, box, nextLayer)),
        );

        return nextLayer;
    }

    /**
     * Returns whether goal was processed in lastLayer.
     *
     * @param lastLayer
     * @private
     */
    private goalWasCheckedIn(lastLayer: GridBox[]) {
        return lastLayer.indexOf(this.grid.goal) !== -1;
    }

    private processNeighbour(neighbour: GridBox, box: GridBox, nextLayer: GridBox[]): void {
        if (!neighbour.isVisited()) {
            this.grid.visitField(neighbour);
            neighbour.setCost(box.getCost() + 1);

            if (nextLayer.indexOf(neighbour) === -1) {
                nextLayer.push(neighbour);
            }
        }
    }
}
