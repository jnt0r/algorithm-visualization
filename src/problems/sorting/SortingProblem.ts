import Renderer from '../../renderer/Renderer';
import Problem from '../Problem';
import SortingProblemSolver from './SortingProblemSolver';
import SortableData from './SortableData';
import ProblemStats from '../ProblemStats';

export default class SortingProblem implements Problem<SortingProblem> {
    private sortables!: SortableData;
    private numbers: number[] = [];

    constructor(private readonly renderer: Renderer) {}

    async solve(solver: SortingProblemSolver): Promise<void> {
        return solver.solve(this.sortables);
    }

    render(): void {
        this.renderer.clear();
        this.sortables.render();
    }

    generate(): void {
        // Generate problem by generating random numbers
        this.numbers = [];

        for (let i = 0; i < 20; i++) {
            this.numbers.push(Math.random() * (this.renderer.getHeight() - 200));
        }

        this.makeProblem();
    }

    reset(): void {
        this.makeProblem();
    }

    getStats(): ProblemStats {
        return this.sortables.getStats();
    }

    private makeProblem(): void {
        this.sortables = new SortableData(this.numbers, this.renderer);
    }
}
