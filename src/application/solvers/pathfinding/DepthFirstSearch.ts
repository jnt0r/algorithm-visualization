import Path from '../../../domain/problems/pathfinding/Path';
import Grid from '../../../domain/problems/pathfinding/Grid';
import GridBox from '../../../domain/problems/pathfinding/GridBox';
import Stack from '../../../utils/Stack';
import LowestCostBasedPathCalculationSolver from './LowestCostBasedPathCalculationSolver';

export default class DepthFirstSearch extends LowestCostBasedPathCalculationSolver {
    private data!: Grid;
    private queue = new Stack<GridBox>();

    solve(data: Grid): Promise<Path> {
        this.data = data;
        this.initialize();

        return this.calculateCosts().then(() => this.calculatePath(data));
    }

    private initialize() {
        this.data.start.setCost(0);
        this.data.start.markVisited();
        this.queue.push(this.data.start);
    }

    private async calculateCosts(): Promise<void> {
        while (!this.queue.isEmpty()) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const box = this.queue.pop()!;
            this.data.visitField(box);
            const neighbours = this.data.getNeighboursOfElement(box);

            let goalFound = false;
            neighbours
                .filter(value => !value.isVisited())
                .forEach(neighbour => {
                    neighbour.setCost(box.getCost() + 1);
                    this.queue.push(neighbour);
                    if (neighbour === this.data.goal) {
                        goalFound = true;
                    }
                });

            await this.data.renderAnimated();

            if (goalFound) return;
        }

        throw new Error('No Path found!');
    }
}
