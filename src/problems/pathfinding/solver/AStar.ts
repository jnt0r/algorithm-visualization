import PathFindingProblemSolver from '../PathFindingProblemSolver';
import Grid from '../Grid';
import Renderer from '../../../renderer/Renderer';
import Box from '../Box';

export default class AStar implements PathFindingProblemSolver {
    private grid!: Grid;
    private openSet: Box[] = [];
    private cameFrom: Box[][] = [];

    async solve(grid: Grid, renderer: Renderer): Promise<void> {
        this.grid = grid;
        grid.start.cost = 0;
        this.openSet = [grid.start];
        this.cameFrom = [];

        while (this.openSet.length !== 0) {
            const current: Box = this.getBestBoxFromOpenSet();
            current.visited = true;

            if (current === grid.goal) {
                this.constructPath();
                return; // Path found. Stop execution
            }

            await renderer.animate(() => {
                const x = current.ax;
                const y = current.ay;
                this.processNeighbour(grid.getElement(x, y + 1), current);
                this.processNeighbour(grid.getElement(x + 1, y), current);
                this.processNeighbour(grid.getElement(x, y - 1), current);
                this.processNeighbour(grid.getElement(x - 1, y), current);
            });
        }
        // No path has been found
        alert('no path found');
    }

    private constructPath(): void {
        let current = this.grid.goal;
        current = this.cameFrom[current.ax][current.ay];
        while (current !== this.grid.start) {
            current.markPartOfPath();
            current = this.cameFrom[current.ax][current.ay];
        }
        this.grid.goal.markGoal();
    }

    private getBestBoxFromOpenSet(): Box {
        this.openSet.sort((a, b) => a.cost + this.getDistanceToGoal(a) - (b.cost + this.getDistanceToGoal(b)));
        return this.openSet.splice(0, 1)[0];
    }

    private processNeighbour(neighbour: Box | undefined, current: Box) {
        if (neighbour && !neighbour.visited) {
            neighbour.markVisited();

            const costFromStart = current.cost + 1;
            if (costFromStart < neighbour.cost) {
                if (!this.cameFrom[neighbour.ax]) {
                    this.cameFrom[neighbour.ax] = [];
                }
                this.cameFrom[neighbour.ax][neighbour.ay] = current;
                neighbour.cost = costFromStart;
                if (this.openSet.indexOf(neighbour) === -1) {
                    this.openSet.push(neighbour);
                }
            }
        }
    }

    private getDistanceToGoal(element: Box): number {
        // Euclidean distance
        const dx = Math.pow(this.grid.goal.ax - element.ax, 2);
        const dy = Math.pow(this.grid.goal.ay - element.ay, 2);
        return Math.sqrt(dx + dy);
    }
}
