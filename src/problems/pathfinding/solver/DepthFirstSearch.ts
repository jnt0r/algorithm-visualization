import PathFindingProblemSolver from '../PathFindingProblemSolver';
import Path from '../Path';
import Grid from '../Grid';
import GridBox from '../GridBox';
import Stack from '../../../utils/Stack';

export default class DepthFirstSearch implements PathFindingProblemSolver {
    private data!: Grid;
    private queue = new Stack<GridBox>();

    solve(data: Grid): Promise<Path> {
        this.data = data;
        this.initialize();

        return this.findPath().then(() => this.calculatePath());
    }

    private async findPath(): Promise<void> {
        while (!this.queue.isEmpty()) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const box = this.queue.pop()!;
            const neighbours = this.data.getNeighboursOfElement(box);

            let goalFound = false;
            neighbours
                .filter((value) => !value.isVisited())
                .forEach((neighbour) => {
                    neighbour.markVisited();
                    neighbour.setCost(box.getCost() + 1);
                    this.queue.push(neighbour);
                    if (neighbour === this.data.goal) {
                        goalFound = true;
                    }
                });

            await this.data.renderAnimated();

            if (goalFound) return;
        }
    }

    private calculatePath() {
        const path = new Path();
        let current = this.data.goal;

        while (current.getCost() !== 1) {
            current = this.getBestNeighbourFor(current);
            path.addPartOfPath(current);
        }

        return path;
    }

    private getBestNeighbourFor(box: GridBox) {
        return this.data.getNeighboursOfElement(box).sort((a, b) => a.getCost() - b.getCost())[0];
    }

    private initialize() {
        this.data.start.setCost(0);
        this.data.start.markVisited();
        this.queue.push(this.data.start);
    }
}
