import ProblemSolver from '../ProblemSolver';
import Grid from './Grid';
import Renderer from '../../renderer/Renderer';

export default interface PathFindingProblemSolver extends ProblemSolver {
    solve(grid: Grid, renderer: Renderer): Promise<void>;
}
