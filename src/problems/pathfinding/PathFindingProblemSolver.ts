import ProblemSolver from '../ProblemSolver';
import Grid from './Grid';
import Renderer from '../../renderer/Renderer';
import PathFindingProblem from './PathFindingProblem';

export default interface PathFindingProblemSolver extends ProblemSolver<PathFindingProblem> {
    solve(grid: Grid, renderer: Renderer): Promise<void>;
}
