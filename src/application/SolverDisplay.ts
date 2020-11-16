import ProblemSolver from '../problems/ProblemSolver';

export default class SolverDisplay<T extends ProblemSolver<never>> {
    constructor(private readonly displayName: string, private readonly solver: { new (): T }) {}

    getSolver(): T {
        return new this.solver();
    }

    toString(): string {
        return this.displayName;
    }
}
