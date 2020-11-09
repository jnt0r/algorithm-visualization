import Renderer from '../renderer/Renderer';
import ProblemSolver from './ProblemSolver';

export default interface Problem<T extends Problem<T>> {
    generate(): void;

    reset(): void;

    solve(renderer: Renderer, solver: ProblemSolver<T>): Promise<void>;

    render(renderer: Renderer): void;
}
