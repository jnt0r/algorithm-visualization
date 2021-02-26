import ProblemStats from './ProblemStats';

export default interface ProblemStatsObserver {
    update(stats: ProblemStats): void;
}
