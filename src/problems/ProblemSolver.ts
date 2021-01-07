import Problem from './Problem';

export default interface ProblemSolver<T extends Problem<T>> {
    solve(data: unknown): Promise<unknown>;
}
