import Renderer from '../../renderer/Renderer';
import Problem from '../Problem';
import SortingProblemSolver from './SortingProblemSolver';
import Bar from './Bar';

export default class SortingProblem implements Problem<SortingProblem> {
    private bars: Bar[] = [];
    private numbers: number[] = [];

    async solve(renderer: Renderer, solver: SortingProblemSolver): Promise<void> {
        return solver.solve(this.bars, renderer);
    }

    render(renderer: Renderer): void {
        renderer.clear();
        this.bars.forEach((v) => {
            renderer.render(v);
        });
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

    /**
     * Transforms the generated numbers to the required problem format
     */
    private makeProblem(): void {
        this.bars = [];
        this.numbers.forEach((value, index) => this.bars.push(new Bar(index, value)));
    }
}
