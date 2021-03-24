import ProblemStats from '../../../domain/problems/ProblemStats';
import ProblemStatsObserver from '../../../domain/problems/ProblemStatsObserver';

export default class StatsComponent implements ProblemStatsObserver {
    private readonly statsDiv: HTMLDivElement = <HTMLDivElement>document.getElementsByClassName('stats')[0];
    private stats: ProblemStats[] = [];
    private currentStat!: HTMLDivElement;

    reset(): void {
        this.clearElement(this.statsDiv);
        this.stats = [];
    }

    createNewStatForAlgorithm(algorithm: string): void {
        const wrapper = document.createElement('div');
        wrapper.classList.add('stat');

        const nameSpan = document.createElement('span');
        nameSpan.classList.add('name');
        nameSpan.innerHTML = algorithm;

        this.currentStat = document.createElement('div');

        wrapper.appendChild(nameSpan);
        wrapper.appendChild(this.currentStat);
        this.statsDiv.prepend(wrapper);
    }

    /**
     * Observer Method for receiving updated ProblemStats
     * @param stats the new ProblemStats object
     */
    update(stats: ProblemStats): void {
        this.clearElement(this.currentStat);

        stats.getStats().forEach((value, name) => {
            const span = document.createElement('span');
            span.classList.add('stat-value');
            span.innerHTML = `${name}: ${value}`;
            this.currentStat.appendChild(span);
        });
    }

    private clearElement(element: HTMLElement): void {
        element.innerHTML = '';
    }
}
