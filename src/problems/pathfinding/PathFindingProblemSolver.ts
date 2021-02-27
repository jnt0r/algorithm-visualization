import ProblemSolver from '../ProblemSolver';
import Grid from './Grid';
import PathFindingProblem from './PathFindingProblem';
import GridBox from './GridBox';

export default interface PathFindingProblemSolver extends ProblemSolver<PathFindingProblem, Grid, GridBox[]> {
    solve(grid: Grid): Promise<GridBox[]>;
}
