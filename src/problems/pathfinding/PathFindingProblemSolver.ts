import ProblemSolver from '../ProblemSolver';
import Grid from './Grid';
import PathFindingProblem from './PathFindingProblem';

export default interface PathFindingProblemSolver extends ProblemSolver<PathFindingProblem> {
    solve(grid: Grid): Promise<void>;
}
