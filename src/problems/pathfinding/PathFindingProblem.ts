import Renderer from '../../display/Renderer';
import Problem from '../Problem';
import Grid from './Grid';
import PathFindingProblemSolver from './PathFindingProblemSolver';

export default class PathFindingProblem implements Problem {
    private grid!: Grid;

    getAlgorithms(): string[] {
        return ['Dijkstra'];
    }

    async solve(renderer: Renderer, solver: PathFindingProblemSolver): Promise<void> {
        return solver.solve(this.grid, renderer);
    }

    render(renderer: Renderer): void {
        renderer.clear();
        this.grid = new Grid(renderer, 40, 30);
    }

    generate(): void {
        console.log('generate');
    }
}
