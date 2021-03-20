import Path from '../Path';
import Grid from '../Grid';
import GridBox from '../GridBox';
import Queue from '../../../utils/Queue';
import LowestCostBasedPathCalculationSolver from './LowestCostBasedPathCalculationSolver';

export default class BreadthFirstSearch extends LowestCostBasedPathCalculationSolver {
    private readonly queue = new Queue<GridBox>();
    private grid!: Grid;

    async solve(data: Grid): Promise<Path> {
        this.grid = data;
        this.initialize();

        return this.searchForPathInGrid().then(() => this.calculatePath(data));
    }

    private initialize() {
        this.grid.start.markVisited();
        this.grid.start.setCost(0);
        this.queue.push(this.grid.start);
    }

    private async searchForPathInGrid(): Promise<void> {
        while (!this.queue.isEmpty()) {
            const box = this.getFirstQueueEntry();
            const possibleNeighbours = this.getAllUnvisitedNeighboursOf(box);

            let goalFound = false;
            possibleNeighbours.forEach(neighbour => {
                this.grid.visitField(neighbour);
                neighbour.setCost(box.getCost() + 1);
                this.queue.push(neighbour);
                if (neighbour === this.grid.goal) {
                    goalFound = true;
                }
            });

            await this.grid.renderAnimated();

            if (goalFound) return;
        }

        throw new Error('No Path found!');
    }

    private getAllUnvisitedNeighboursOf(box: GridBox) {
        return this.grid.getNeighboursOfElement(box).filter(value => !value.isVisited());
    }

    private getFirstQueueEntry(): GridBox {
        // We checked that queue is not empty before calling this method so we can ignore possible unknown return values
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.queue.pop()!;
    }
}
