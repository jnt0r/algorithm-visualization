import ProblemSolver from '../ProblemSolver';
import SortingProblem from './SortingProblem';
import SortableData from './SortableData';

export default interface SortingProblemSolver extends ProblemSolver<SortingProblem, SortableData, void> {
    solve(data: SortableData): Promise<void>;
}
