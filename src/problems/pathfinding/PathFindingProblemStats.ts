import ProblemStats from '../ProblemStats';

export default class PathFindingProblemStats extends ProblemStats {
    constructor() {
        super();

        this.setStat('fields checked', 0);
    }

    addCheckedField(): void {
        this.add('fields checked', 1);
    }
}
