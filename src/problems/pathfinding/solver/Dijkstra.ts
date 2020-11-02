import PathFindingProblemSolver from '../PathFindingProblemSolver';
import Renderer from '../../../renderer/Renderer';
import Grid from '../Grid';

export default class Dijkstra implements PathFindingProblemSolver {
    solve(grid: Grid, renderer: Renderer): Promise<void> {
        return grid.solve();
    }
}
