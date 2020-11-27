import Renderer from '../renderer/Renderer';
import Problem from './Problem';

export default interface ProblemSolver<T extends Problem<T>> {
    solve(data: unknown, renderer: Renderer): Promise<void>;
}
