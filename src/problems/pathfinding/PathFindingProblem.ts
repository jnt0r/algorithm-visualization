import Renderer from '../../renderer/Renderer';
import Problem from '../Problem';
import Grid from './Grid';
import PathFindingProblemSolver from './PathFindingProblemSolver';
import ProblemStats from '../ProblemStats';

export default class PathFindingProblem implements Problem<PathFindingProblem> {
    protected grid!: Grid;

    constructor(private readonly renderer: Renderer) {}

    async solve(solver: PathFindingProblemSolver): Promise<void> {
        return solver.solve(this.grid).then(async (path) => {
            for (const part of path) {
                this.grid.getStats().addPathField();
                part.markPartOfPath();

                await this.grid.renderAnimated();
            }
        });
    }

    render(): void {
        this.renderer.clear();
        this.grid.render();
    }

    generate(): void {
        this.grid = new Grid(this.renderer.getWidth() / 20, this.renderer.getHeight() / 20, this.renderer);
    }

    reset(): void {
        this.grid.reset();
    }

    getStats(): ProblemStats {
        return this.grid.getStats();
    }
}
