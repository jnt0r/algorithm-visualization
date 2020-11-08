import Renderer from '../renderer/Renderer';
import ProblemSolver from './ProblemSolver';

export default interface Problem {
    generate(): void;

    reset(): void;

    solve(renderer: Renderer, solver: ProblemSolver): Promise<void>;

    render(renderer: Renderer): void;
}
