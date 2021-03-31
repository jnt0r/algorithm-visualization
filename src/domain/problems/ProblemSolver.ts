import Problem from './Problem';

/**
 * T - The type of problem this solver can solve.
 *
 * I - The input type this solver receives.
 *
 * R - The output type this solver is supposed to produce.
 */
export default interface ProblemSolver<T extends Problem<T>, I, R> {
    solve(data: I): Promise<R>;
}
