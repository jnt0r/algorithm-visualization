import Problem from '../problems/Problem';
import SolverDisplay from './SolverDisplay';
import ProblemSolver from '../problems/ProblemSolver';
import Renderer from '../renderer/Renderer';

export default class ProblemDisplay<T extends Problem<T>, S extends ProblemSolver<T>> {
    constructor(
        private readonly displayName: string,
        private readonly problem: { new (renderer: Renderer): T },
        private readonly solvers: SolverDisplay<S>[],
    ) {}

    getProblem(renderer: Renderer): T {
        return new this.problem(renderer);
    }

    getSolvers(): SolverDisplay<S>[] {
        return this.solvers;
    }

    toString(): string {
        return this.displayName;
    }
}
