import PathFindingProblemSolver from '../PathFindingProblemSolver';
import Path from '../Path';
import Grid from '../Grid';
import GridBox from '../GridBox';
import Queue from '../../../utils/Queue';

export default class BreadthFirstSearch implements PathFindingProblemSolver {
    private readonly queue = new Queue<GridBox>();
    private grid!: Grid;

    async solve(data: Grid): Promise<Path> {
        this.grid = data;
        this.initialize();

        return this.searchForPathInGrid().then(() => this.calculatePath());
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
            possibleNeighbours.forEach((neighbour) => {
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
        return this.grid.getNeighboursOfElement(box).filter((value) => !value.isVisited());
    }

    private getFirstQueueEntry(): GridBox {
        // We checked that queue is not empty before calling this method so we can ignore possible unknown return values
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.queue.pop()!;
    }

    private calculatePath() {
        const path = new Path();
        let current = this.grid.goal;

        while (current.getCost() !== 1) {
            current = this.getBestNeighbourFor(current);
            path.addPartOfPath(current);
        }

        return path;
    }

    private getBestNeighbourFor(box: GridBox) {
        return this.grid.getNeighboursOfElement(box).sort((a, b) => a.getCost() - b.getCost())[0];
    }
}
