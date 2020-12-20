import PathFindingProblemSolver from '../PathFindingProblemSolver';
import Grid from '../Grid';
import GridBox from '../GridBox';

export default class AStar implements PathFindingProblemSolver {
    private grid!: Grid;

    private openSet: GridBox[] = [];
    private cameFrom: GridBox[][] = [];

    async solve(grid: Grid): Promise<void> {
        this.grid = grid;
        this.openSet = [grid.start];
        this.cameFrom = [];
        grid.start.setCost(0);

        while (this.openSet.length !== 0) {
            const current: GridBox = this.getBestBoxFromOpenSet();
            await grid.renderAnimated();

            if (current === grid.goal) {
                await this.constructPath();

                return; // Path found. Stop execution
            }

            const x = current.ax;
            const y = current.ay;
            this.processNeighbour(grid.getElement(x, y + 1), current);
            this.processNeighbour(grid.getElement(x + 1, y), current);
            this.processNeighbour(grid.getElement(x, y - 1), current);
            this.processNeighbour(grid.getElement(x - 1, y), current);
        }
        // No path has been found
        throw new Error('No path found');
    }

    private async constructPath(): Promise<void> {
        let current = this.grid.goal;
        current = this.cameFrom[current.ax][current.ay];
        while (current !== this.grid.start) {
            current.markPartOfPath();
            await this.grid.renderAnimated();
            current = this.cameFrom[current.ax][current.ay];
        }
    }

    private getBestBoxFromOpenSet(): GridBox {
        this.openSet = this.openSet.sort(
            (a, b) => a.getCost() + this.getDistanceToGoal(a) - (b.getCost() + this.getDistanceToGoal(b)),
        );

        return this.openSet.splice(0, 1)[0];
    }

    private processNeighbour(neighbour: GridBox | undefined, current: GridBox) {
        if (neighbour && !neighbour.isVisited()) {
            neighbour.markVisited();
            const costFromStart = current.getCost() + 1;
            if (costFromStart < neighbour.getCost()) {
                if (!this.cameFrom[neighbour.ax]) {
                    this.cameFrom[neighbour.ax] = [];
                }
                this.cameFrom[neighbour.ax][neighbour.ay] = current;
                neighbour.setCost(costFromStart);
                if (this.openSet.indexOf(neighbour) === -1) {
                    this.openSet.push(neighbour);
                }
            }
        }
    }

    private getDistanceToGoal(element: GridBox): number {
        // Euclidean distance
        const dx = Math.pow(this.grid.goal.ax - element.ax, 2);
        const dy = Math.pow(this.grid.goal.ay - element.ay, 2);

        return dx + dy;
    }
}
