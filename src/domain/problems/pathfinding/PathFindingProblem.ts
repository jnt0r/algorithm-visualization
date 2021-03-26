import Problem from '../Problem';
import Grid from './Grid';
import PathFindingProblemSolver from './PathFindingProblemSolver';
import ProblemStats from '../ProblemStats';
import Path from './Path';
import MustInitializeWithRenderer from '../MustInitializeWithRenderer';

export default class PathFindingProblem extends MustInitializeWithRenderer implements Problem<PathFindingProblem> {
    protected grid!: Grid;

    async solve(solver: PathFindingProblemSolver): Promise<void> {
        return solver.solve(this.grid).then(path => this.visualizePath(path));
    }

    render(): void {
        this.grid.render();
    }

    generate(): void {
        this.grid = new Grid(this.calculateGridWidth(), this.calculateGridHeight(), this.renderer);
    }

    reset(): void {
        this.grid.reset();
    }

    getStats(): ProblemStats {
        return this.grid.getStats();
    }

    private calculateGridHeight() {
        let height = Math.floor(this.renderer.getHeight() / 20);
        if (height % 2 === 0) {
            height -= 1;
        }

        return height;
    }

    /**
     * Calculates number of grid elements per row based on the available space.
     *
     * @private
     */
    private calculateGridWidth() {
        const elementsPerRow = 20;
        let width = Math.floor(this.renderer.getWidth() / elementsPerRow);
        if (width % 2 === 0) {
            width -= 1;
        }

        return width;
    }

    private async visualizePath(path: Path): Promise<void> {
        for (const part of path.getPath()) {
            part.markPartOfPath();
            this.grid.getStats().addPathField();

            await this.grid.renderPathPart(part);
        }
    }
}
