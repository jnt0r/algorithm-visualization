import Problem from '../problems/Problem';
import SolverDisplay from './SolverDisplay';
import ProblemSolver from '../problems/ProblemSolver';

export default class ProblemDisplay<T extends Problem<T>, S extends ProblemSolver<T>> {
    constructor(
        private readonly displayName: string,
        private readonly problem: T,
        private readonly solvers: SolverDisplay<S>[],
    ) {}

    getProblem(): T {
        return this.problem;
    }

    getSolvers(): SolverDisplay<S>[] {
        return this.solvers;
    }

    toString(): string {
        return this.displayName;
    }
}
