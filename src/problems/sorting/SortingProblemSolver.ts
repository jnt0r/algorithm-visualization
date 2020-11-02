import ProblemSolver from '../ProblemSolver';
import Renderer from '../../renderer/Renderer';
import Bar from './Bar';

export default interface SortingProblemSolver extends ProblemSolver {
    solve(values: Bar[], renderer: Renderer): Promise<void>;
}
