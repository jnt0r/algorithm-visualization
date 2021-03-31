import Problem from '../Problem';
import SortingProblemSolver from './SortingProblemSolver';
import SortableData from './SortableData';
import ProblemStats from '../ProblemStats';
import MustInitializeWithRenderer from '../MustInitializeWithRenderer';

export default class SortingProblem extends MustInitializeWithRenderer implements Problem<SortingProblem> {
    private readonly NUMBER_OF_ELEMENTS = 20;

    private sortables!: SortableData;
    private numbers: number[] = [];

    async solve(solver: SortingProblemSolver): Promise<void> {
        return solver.solve(this.sortables);
    }

    render(): void {
        this.makeProblem();
    }

    generate(): void {
        this.generateRandomNumbers();
    }

    reset(): void {
        this.makeProblem();
    }

    getStats(): ProblemStats {
        return this.sortables.getStats();
    }

    private generateRandomNumbers() {
        this.numbers = [];
        const maxNumber = this.renderer.getHeight() * 0.8;

        for (let i = 0; i < this.NUMBER_OF_ELEMENTS; i++) {
            this.numbers.push(Math.random() * maxNumber);
        }
    }

    private makeProblem(): void {
        this.sortables = new SortableData(this.numbers, this.renderer);
    }
}
