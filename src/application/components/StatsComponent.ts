import ProblemStats from '../../problems/ProblemStats';
import ProblemStatsObserver from '../../problems/ProblemStatsObserver';

export default class StatsComponent implements ProblemStatsObserver {
    private readonly statsDiv: HTMLDivElement = <HTMLDivElement>document.getElementsByClassName('stats')[0];

    /**
     * Observer Method for receiving updated ProblemStats
     * @param stats the new ProblemStats object
     */
    update(stats: ProblemStats): void {
        this.statsDiv.innerHTML = '';

        stats.getStats().forEach(this.displayStat);
    }

    private displayStat(value: unknown, key: string): void {
        const span = document.createElement('span');
        span.innerHTML = `${key}: ${value}`;
        this.statsDiv.appendChild(span);
    }
}
