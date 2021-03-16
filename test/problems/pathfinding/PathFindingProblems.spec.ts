import Grid from '../../../src/problems/pathfinding/Grid';
import { TestRenderer } from '../../TestRenderer';
import Renderer from '../../../src/renderer/Renderer';
import PathFindingProblem from '../../../src/problems/pathfinding/PathFindingProblem';
import PathFindingProblemSolver from '../../../src/problems/pathfinding/PathFindingProblemSolver';
import Path from '../../../src/problems/pathfinding/Path';
import AStar from '../../../src/problems/pathfinding/solver/AStar';
import Dijkstra from '../../../src/problems/pathfinding/solver/Dijkstra';
import DepthFirstSearch from '../../../src/problems/pathfinding/solver/DepthFirstSearch';
import BreadthFirstSearch from '../../../src/problems/pathfinding/solver/BreadthFirstSearch';

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

    describe('Solver', () => {
        beforeEach(() => {
            let counter = 1;
            jest.spyOn(global.Math, 'random').mockImplementation(() => {
                if (counter <= 2) {
                    counter++;

                    return 0;
                } else {
                    return 0.9;
                }
            });
        });

        afterEach(() => {
            jest.spyOn(global.Math, 'random').mockRestore();
        });

        // Parameterized test for each PathfindingProblemSolver implementation
        test.each([
            ['Dijkstra', new Dijkstra()],
            ['DepthFirstSearch', new DepthFirstSearch()],
            ['BreadthFirstSearch', new BreadthFirstSearch()],
            ['AStar', new AStar()],
        ])('%s', async (name: string, solver: PathFindingProblemSolver) => {
            // start should be at 0,0
            // goal should be at 2,4
            const data = new Grid(3, 5, renderer);
            // creating maze with following structure
            // 0,1,0
            // 0,1,0
            // 0,0,0
            // 0,1,0
            // 0,1,0
            data.getElement(1, 0)!.setWall();
            data.getElement(1, 1)!.setWall();
            data.getElement(1, 3)!.setWall();
            data.getElement(1, 4)!.setWall();

            const path = (await solver.solve(data)).getPath();

            expect(path.length).toBe(5);
            expect(path[0]).toEqual(data.getElement(2, 3)!);
            expect(path[1]).toEqual(data.getElement(2, 2)!);
            expect(path[2]).toEqual(data.getElement(1, 2)!);
            expect(path[3]).toEqual(data.getElement(0, 2)!);
            expect(path[4]).toEqual(data.getElement(0, 1)!);
        });
    });
});
