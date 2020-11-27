import Renderer from '../../renderer/Renderer';
import Problem from '../Problem';
import Grid from './Grid';
import PathFindingProblemSolver from './PathFindingProblemSolver';

export default class PathFindingProblem implements Problem<PathFindingProblem> {
    private grid!: Grid;

    constructor(private readonly renderer: Renderer) {}

    async solve(renderer: Renderer, solver: PathFindingProblemSolver): Promise<void> {
        return solver.solve(this.grid, renderer);
    }

    render(renderer: Renderer): void {
        renderer.clear();
        this.grid.render(renderer);
    }

    generate(): void {
        this.grid = new Grid(1600 / 21, 800 / 21, this.renderer);
    }

    reset(): void {
        this.grid.reset();
    }
}
