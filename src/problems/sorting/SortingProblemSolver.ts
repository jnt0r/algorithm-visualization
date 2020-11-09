import ProblemSolver from '../ProblemSolver';
import Renderer from '../../renderer/Renderer';
import Bar from './Bar';
import SortingProblem from './SortingProblem';

export default interface SortingProblemSolver extends ProblemSolver<SortingProblem> {
    solve(values: Bar[], renderer: Renderer): Promise<void>;
}
