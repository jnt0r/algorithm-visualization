import PathFindingProblemSolver from '../PathFindingProblemSolver';
import Grid from '../Grid';
import Renderer from '../../../renderer/Renderer';
import Box from '../Box';

export default class AStar implements PathFindingProblemSolver {
    private grid!: Grid;
    private openList: Box[] = [];

    async solve(grid: Grid, renderer: Renderer): Promise<void> {
        this.grid = grid;
        this.openList = [];
        const closedList: Box[] = [];

        grid.start.cost = 0;
        this.openList.push(grid.start);

        let dot = this.openList[0];
        while (this.openList.length !== 0 && dot !== grid.goal) {
            console.log(dot);
            dot.visited = true;
            this.openList.splice(this.openList.indexOf(dot), 1);

            await renderer.animate(() => {
                const x = dot.ax;
                const y = dot.ay;
                this.processNeighbour(grid.getElement(x + 1, y), dot.cost + 1);
                this.processNeighbour(grid.getElement(x - 1, y), dot.cost + 1);
                this.processNeighbour(grid.getElement(x, y + 1), dot.cost + 1);
                this.processNeighbour(grid.getElement(x, y - 1), dot.cost + 1);
            });
            console.log([...this.openList]);
            dot = this.openList.sort(
                (a, b) => a.cost + this.getDistanceToGoal(a) - (b.cost + this.getDistanceToGoal(b)),
            )[0];
        }
        console.log('finished');
        grid.goal.markGoal();
    }

    getDistanceToGoal(element: Box): number {
        return Math.sqrt(Math.pow(this.grid.goal.ax - element.ax, 2) + Math.pow(this.grid.goal.ay - element.ay, 2));
    }

    private processNeighbour(element: Box | undefined, costFromStart: number) {
        if (element && !element.visited) {
            if (this.openList.indexOf(element) !== -1) {
                if (costFromStart < element.cost) {
                    element.cost = costFromStart;
                }
                // Element already in queue
            } else {
                // Element not in queue
                element.cost = costFromStart;
                element.markVisited();
                this.openList.push(element);
            }
        }
    }
}
