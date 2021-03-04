import Grid from '../../../src/problems/pathfinding/Grid';
import { TestRenderer } from '../../TestRenderer';
import Renderer from '../../../src/renderer/Renderer';
import PathFindingProblem from '../../../src/problems/pathfinding/PathFindingProblem';
import PathFindingProblemSolver from '../../../src/problems/pathfinding/PathFindingProblemSolver';
import Path from '../../../src/problems/pathfinding/Path';

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
            solve(grid: Grid): Promise<Path> {
                const path = new Path();
                path.addPartOfPath(grid.getElement(1, 1)!);
                path.addPartOfPath(grid.getElement(1, 2)!);
                path.addPartOfPath(grid.getElement(1, 3)!);
                path.addPartOfPath(grid.getElement(1, 4)!);
                path.addPartOfPath(grid.getElement(1, 5)!);

                return Promise.resolve(path);
            },
        };
        const pathFindingProblem = new PathFindingProblem(new TestRenderer());
        pathFindingProblem.generate();

        await pathFindingProblem.solve(solverMock);

        expect(pathFindingProblem.getStats().getStats().get('Path fields')).toEqual(5);
    });

    // describe('Solver', () => {
    //     // Parameterized test for each SortingProblemSolver implementation
    //     test.each([
    //         ['Dijkstra', new Dijkstra()],
    //         ['AStar', new AStar()],
    //     ])('%s', async (name: string, solver: PathFindingProblemSolver) => {
    //         const data = new Grid(10, 10, renderer);
    //
    //         const path = await solver.solve(data);
    //
    //         expect(path.getPath()).toEqual([data.getElement(0, 0)!]);
    //     });
    // });
});
