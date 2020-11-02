import Renderer from '../display/Renderer';
import ProblemSolver from './ProblemSolver';

export default interface Problem {
    generate(): void;

    solve(renderer: Renderer, solver: ProblemSolver): Promise<void>;

    render(renderer: Renderer): void;
}
