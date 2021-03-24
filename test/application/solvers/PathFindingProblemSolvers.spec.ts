import Dijkstra from '../../../src/application/solvers/pathfinding/Dijkstra';
import DepthFirstSearch from '../../../src/application/solvers/pathfinding/DepthFirstSearch';
import BreadthFirstSearch from '../../../src/application/solvers/pathfinding/BreadthFirstSearch';
import AStar from '../../../src/application/solvers/pathfinding/AStar';
import PathFindingProblemSolver from '../../../src/domain/problems/pathfinding/PathFindingProblemSolver';
import Grid from '../../../src/domain/problems/pathfinding/Grid';
import { TestRenderer } from '../../TestRenderer';
import Renderer from '../../../src/domain/renderer/Renderer';

describe('PathFindingProblemSolvers', () => {
    const renderer: Renderer = new TestRenderer();
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
        [ 'Dijkstra', new Dijkstra() ],
        [ 'DepthFirstSearch', new DepthFirstSearch() ],
        [ 'BreadthFirstSearch', new BreadthFirstSearch() ],
        [ 'AStar', new AStar() ]
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
