import ProblemStats from '../ProblemStats';

export default class SortingProblemStats extends ProblemStats {
    constructor() {
        super();

        this.setStat('comparisons', 0);
        this.setStat('swaps', 0);
    }

    addComparison(): void {
        this.add('comparisons', 1);
    }

    addSwap(): void {
        this.add('swaps', 1);
    }
}
