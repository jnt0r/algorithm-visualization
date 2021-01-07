import Renderer from '../../renderer/Renderer';
import Problem from '../Problem';
import Grid from './Grid';
import PathFindingProblemSolver from './PathFindingProblemSolver';
import ProblemStats from '../ProblemStats';
import GridBox from './GridBox';

export default class PathFindingProblem implements Problem<PathFindingProblem> {
    protected grid!: Grid;

    constructor(private readonly renderer: Renderer) {}

    async solve(solver: PathFindingProblemSolver): Promise<void> {
        return solver.solve(this.grid).then((path) => this.constructPath(path));
    }

    render(): void {
        this.renderer.clear();
        this.grid.render();
    }

    generate(): void {
        this.grid = new Grid(
            Math.floor(this.renderer.getWidth() / 20),
            Math.floor(this.renderer.getHeight() / 20),
            this.renderer,
        );
    }

    reset(): void {
        this.grid.reset();
    }

    getStats(): ProblemStats {
        return this.grid.getStats();
    }

    private async constructPath(path: GridBox[]): Promise<void> {
        for (const part of path) {
            this.grid.getStats().addPathField();
            part.markPartOfPath();

            await this.grid.renderAnimated();
        }
    }
}
