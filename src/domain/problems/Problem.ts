import ProblemSolver from './ProblemSolver';
import ProblemStats from './ProblemStats';

export default interface Problem<T extends Problem<T>> {

    /**
     * Should generate a new problem.
     */
    generate(): void;

    /**
     * Should reset current problem to state before it has been solved.
     * Should not break if called several times after reset.
     */
    reset(): void;

    /**
     * Should solve current problem with given solver.
     *
     * @param solver
     */
    solve(solver: ProblemSolver<T, unknown, unknown>): Promise<void>;

    /**
     * Should display whole problem.
     */
    render(): void;

    /**
     * Should return stats for the current problem.
     */
    getStats(): ProblemStats;
}
