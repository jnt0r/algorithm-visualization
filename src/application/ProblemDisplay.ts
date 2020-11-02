import Problem from '../problems/Problem';
import SolverDisplay from './SolverDisplay';

export default class ProblemDisplay {
    constructor(
        private readonly displayName: string,
        private readonly problem: Problem,
        private readonly solvers: SolverDisplay[],
    ) {}

    getProblem(): Problem {
        return this.problem;
    }

    getSolvers(): SolverDisplay[] {
        return this.solvers;
    }

    toString(): string {
        return this.displayName;
    }
}
