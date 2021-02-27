import ProblemSolver from '../ProblemSolver';
import Grid from './Grid';
import PathFindingProblem from './PathFindingProblem';
import Path from './Path';

export default interface PathFindingProblemSolver extends ProblemSolver<PathFindingProblem, Grid, Path> {
    solve(grid: Grid): Promise<Path>;
}
