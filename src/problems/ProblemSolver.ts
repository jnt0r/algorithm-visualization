import Problem from './Problem';

export default interface ProblemSolver<T extends Problem<T>, I, R> {
    solve(data: I): Promise<R>;
}
