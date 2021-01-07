import ProblemStats from '../ProblemStats';

export default class PathFindingProblemStats extends ProblemStats {
    constructor() {
        super();

        this.setStat('Visited fields', 0);
        this.setStat('Path fields', 0);
    }

    addVisitedField(): void {
        this.add('Visited fields', 1);
    }

    addPathField(): void {
        this.add('Path fields', 1);
    }
}
