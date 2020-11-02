import Renderer from '../../display/Renderer';
import Problem from '../Problem';
import SortingProblemSolver from './SortingProblemSolver';
import Bar from './Bar';

export default class SortingProblem implements Problem {
    private values: Bar[] = [];

    getAlgorithms(): string[] {
        return ['Bubblesort', 'Selectionsort'];
    }

    async solve(renderer: Renderer, solver: SortingProblemSolver): Promise<void> {
        return solver.solve(this.values, renderer);
    }

    render(renderer: Renderer): void {
        renderer.clear();
        this.values.forEach((v) => {
            renderer.render(v);
        });
    }

    generate(): void {
        this.values = [];
        for (let i = 0; i < 20; i++) {
            this.values.push(new Bar(i, Math.random() * 500));
        }
    }
}
