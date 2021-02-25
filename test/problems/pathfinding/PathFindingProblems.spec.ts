import Grid from '../../../src/problems/pathfinding/Grid';
import { TestRenderer } from '../../TestRenderer';
import Renderer from '../../../src/renderer/Renderer';
import PathFindingProblem from '../../../src/problems/pathfinding/PathFindingProblem';
import PathFindingProblemSolver from '../../../src/problems/pathfinding/PathFindingProblemSolver';
import GridBox from '../../../src/problems/pathfinding/GridBox';

describe('PathFindingProblem', () => {
    const renderer: Renderer = new TestRenderer();

    test('Visited fields stat should be initialized with 0', () => {
        const data = new Grid(10, 10, renderer);
        expect(data.getStats().getStats().get('Visited fields')).toEqual(0);
    });

    test('Visited fields stat should increase by 1 on getElement', () => {
        const data = new Grid(10, 10, renderer);
        data.getElement(1, 1);
        expect(data.getStats().getStats().get('Visited fields')).toEqual(1);
    });

    test('Path fields stat should be initialized with 0', () => {
        const data = new Grid(10, 10, renderer);
        expect(data.getStats().getStats().get('Path fields')).toEqual(0);
    });

    test('Path fields stat should increase by 1 per returned Path field', async () => {
        const solverMock: PathFindingProblemSolver = {
            solve(grid: Grid): Promise<GridBox[]> {
                return Promise.resolve([
                    grid.getElement(1, 1)!,
                    grid.getElement(1, 2)!,
                    grid.getElement(1, 3)!,
                    grid.getElement(1, 4)!,
                    grid.getElement(1, 5)!,
                ]);
            },
        };
        const pathFindingProblem = new PathFindingProblem(new TestRenderer());
        pathFindingProblem.generate();

        await pathFindingProblem.solve(solverMock);

        expect(pathFindingProblem.getStats().getStats().get('Path fields')).toEqual(5);
    });
});
