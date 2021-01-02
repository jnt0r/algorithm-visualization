import ProblemSolver from './ProblemSolver';
import ProblemStats from './ProblemStats';

export default interface Problem<T extends Problem<T>> {
    generate(): void;

    reset(): void;

    solve(solver: ProblemSolver<T>): Promise<void>;

    render(): void;

    getStats(): ProblemStats;
}
