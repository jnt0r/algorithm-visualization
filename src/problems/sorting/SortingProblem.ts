import Renderer from '../../renderer/Renderer';
import Problem from '../Problem';
import SortingProblemSolver from './SortingProblemSolver';
import SortableData from './SortableData';

export default class SortingProblem implements Problem<SortingProblem> {
    private sortables!: SortableData;
    private numbers: number[] = [];

    constructor(private readonly renderer: Renderer) {}

    async solve(solver: SortingProblemSolver): Promise<void> {
        return solver.solve(this.sortables, this.renderer);
    }

    render(): void {
        this.renderer.clear();
        this.sortables.render(this.renderer);
    }

    generate(): void {
        // Generate problem by generating random numbers
        this.numbers = [];

        for (let i = 0; i < 20; i++) {
            this.numbers.push(Math.random() * 500);
        }

        this.makeProblem();
    }

    reset(): void {
        this.makeProblem();
    }

    private makeProblem(): void {
        this.sortables = new SortableData(this.numbers, this.renderer);
    }
}
