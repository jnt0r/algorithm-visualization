import ProblemSolver from '../ProblemSolver';
import Renderer from '../../renderer/Renderer';
import SortingProblem from './SortingProblem';
import SortableData from './SortableData';

export default interface SortingProblemSolver extends ProblemSolver<SortingProblem> {
    solve(data: SortableData, renderer: Renderer): Promise<void>;
}
