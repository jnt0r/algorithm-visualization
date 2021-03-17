import PathFindingProblemSolver from '../PathFindingProblemSolver';
import Grid from '../Grid';
import GridBox from '../GridBox';
import Path from '../Path';

export default class Dijkstra implements PathFindingProblemSolver {
    private grid!: Grid;

    async solve(grid: Grid): Promise<Path> {
        this.grid = grid;
        grid.start.setCost(0);
        grid.start.markVisited();

        return this.calculateCostsForEachElementOfGrid().then(() => this.calculatePath());
    }

    private async calculateCostsForEachElementOfGrid(): Promise<void> {
        let layer: GridBox[] = [this.grid.start];

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
     * Calculates costs for all neighbours of the elements in lastLayer and returns all neighbours of lastLayer elements.
     *
     * @param lastLayer
     * @return All neighbours of the elements of the lastLayer
     * @private
     */
    private calculateNextLayer(lastLayer: GridBox[]): GridBox[] {
        const nextLayer: GridBox[] = [];

        lastLayer.forEach((box) =>
            this.grid
                .getNeighboursOfElement(box)
                .forEach((neighbour) => this.processNeighbour(neighbour, box, nextLayer)),
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

    private calculatePath(): Path {
        const path = new Path();
        let current = this.grid.goal;

        while (current.getCost() !== 1) {
            current = this.calculateBestNeighbourForElement(current);
            path.addPartOfPath(current);
        }

        return path;
    }

    /**
     * Calculates neighbour with lowest costs.
     *
     * @param current
     * @private
     */
    private calculateBestNeighbourForElement(current: GridBox): GridBox {
        return this.grid
            .getNeighboursOfElement(current)
            .filter((a) => a.getCost() != -1)
            .sort((a, b) => (a.getCost() < b.getCost() ? -1 : 1))[0];
    }
}
