import Grid from '../../../domain/problems/pathfinding/Grid';
import Path from '../../../domain/problems/pathfinding/Path';
import GridBox from '../../../domain/problems/pathfinding/GridBox';
import PathFindingProblemSolver from '../../../domain/problems/pathfinding/PathFindingProblemSolver';

export default abstract class LowestCostBasedPathCalculationSolver implements PathFindingProblemSolver {
    abstract solve(data: Grid): Promise<Path>;

    protected calculatePath(data: Grid): Path {
        const path = new Path();
        let current = data.goal;

        while (current.getCost() !== 1) {
            current = this.getBestNeighbourFor(current, data);
            path.addPartOfPath(current);
        }

        return path;
    }

    private getBestNeighbourFor(box: GridBox, data: Grid) {
        return data.getNeighboursOfElement(box).sort((a, b) => a.getCost() - b.getCost())[0];
    }
}
