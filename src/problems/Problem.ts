import ProblemSolver from './ProblemSolver';

export default interface Problem<T extends Problem<T>> {
    generate(): void;

    reset(): void;

    solve(solver: ProblemSolver<T>): Promise<void>;

    render(): void;
}
