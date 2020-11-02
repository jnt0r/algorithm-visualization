import ProblemSolver from '../problems/ProblemSolver';

export default class SolverDisplay {
    constructor(private readonly displayName: string, private readonly solver: ProblemSolver) {}

    getSolver(): ProblemSolver {
        return this.solver;
    }

    toString(): string {
        return this.displayName;
    }
}
