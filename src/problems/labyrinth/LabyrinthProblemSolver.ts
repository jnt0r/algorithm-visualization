import ProblemSolver from '../ProblemSolver';
import LabyrinthProblem from './LabyrinthProblem';
import Grid from '../pathfinding/Grid';

export default interface LabyrinthProblemSolver extends ProblemSolver<LabyrinthProblem> {
    solve(data: Grid): Promise<void>;
}
