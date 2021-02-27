import PathFindingProblemSolver from '../PathFindingProblemSolver';
import Grid from '../Grid';
import GridBox from '../GridBox';
import Path from '../Path';

export default class AStar implements PathFindingProblemSolver {
    private grid!: Grid;

    private openSet: GridBox[] = [];
    private closedSet: GridBox[] = [];
    private cameFrom: GridBox[][] = [];

    async solve(grid: Grid): Promise<Path> {
        this.grid = grid;
        this.openSet = [grid.start];
        this.closedSet = [];
        this.cameFrom = [];
        grid.start.setCost(0);

        let count = 0;
        while (this.openSet.length !== 0) {
            count++;
            const current: GridBox = this.getBestFromOpenSet();
            current.markVisited();

            if (current === grid.goal) {
                return this.constructPath();
            }

            this.closedSet.push(current);

            grid.getNeighboursOfElement(current).forEach((neighbour) => this.processNeighbour(neighbour, current));
            if (count === 5) {
                count = 0;
                await grid.renderAnimated();
            }
        }
        // No path has been found
        throw new Error('No path found');
    }

    private async constructPath(): Promise<Path> {
        const path = new Path();
        let current = this.grid.goal;
        current = this.cameFrom[current.point.getX()][current.point.getY()];
        while (current !== this.grid.start) {
            path.addPartOfPath(current);
            current = this.cameFrom[current.point.getX()][current.point.getY()];
        }

        return path;
    }

    private getBestFromOpenSet(): GridBox {
        return this.openSet
            .sort((a, b) => a.getCost() + this.getDistanceToGoal(a) - (b.getCost() + this.getDistanceToGoal(b)))
            .splice(0, 1)[0];
    }

    private processNeighbour(neighbour: GridBox, current: GridBox): void {
        if (this.closedSet.indexOf(neighbour) !== -1) {
            return;
        }
        // if (!neighbour.isVisited()) {
        //     neighbour.markVisited();
        const costFromStart = current.getCost() + 1;
        if (this.openSet.indexOf(neighbour) !== -1 && costFromStart >= neighbour.getCost()) {
            return;
        }

        if (!this.cameFrom[neighbour.point.getX()]) {
            this.cameFrom[neighbour.point.getX()] = [];
        }
        this.cameFrom[neighbour.point.getX()][neighbour.point.getY()] = current;
        neighbour.setCost(costFromStart);
        if (this.openSet.indexOf(neighbour) === -1) {
            this.openSet.push(neighbour);
        }
        // }
    }

    private getDistanceToGoal(element: GridBox): number {
        return element.point.distanceTo(this.grid.goal.point);
    }
}
