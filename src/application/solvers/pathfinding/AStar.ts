import PathFindingProblemSolver from '../../../domain/problems/pathfinding/PathFindingProblemSolver';
import Grid from '../../../domain/problems/pathfinding/Grid';
import GridBox from '../../../domain/problems/pathfinding/GridBox';
import Path from '../../../domain/problems/pathfinding/Path';

export default class AStar implements PathFindingProblemSolver {
    private grid!: Grid;

    private openSet: GridBox[] = [];
    private closedSet: GridBox[] = [];
    private cameFrom: GridBox[][] = [];

    async solve(grid: Grid): Promise<Path> {
        this.grid = grid;
        this.openSet = [ grid.start ];
        this.closedSet = [];
        this.cameFrom = [];
        grid.start.setCost(0);

        return this.findPathInGrid().then(() => this.constructPath());
    }

    private async findPathInGrid(): Promise<void> {
        while (this.openSet.length !== 0) {
            const current: GridBox = this.getBestFromOpenSet();
            this.grid.visitField(current);

            if (current === this.grid.goal) {
                return;
            }

            this.closedSet.push(current);

            this.grid.getNeighboursOfElement(current).forEach(neighbour => this.processNeighbour(neighbour, current));

            await this.grid.renderAnimated();
        }

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
        if (this.isContainedInClosedSet(neighbour)) {
            return;
        }
        const costFromStart = current.getCost() + 1;
        if (this.isContainedInOpenSet(neighbour) && costFromStart >= neighbour.getCost()) {
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
    }

    private isContainedInOpenSet(neighbour: GridBox) {
        return this.openSet.indexOf(neighbour) !== -1;
    }

    private isContainedInClosedSet(neighbour: GridBox) {
        return this.closedSet.indexOf(neighbour) !== -1;
    }

    private getDistanceToGoal(element: GridBox): number {
        return element.point.euclideanDistanceTo(this.grid.goal.point);
    }
}
