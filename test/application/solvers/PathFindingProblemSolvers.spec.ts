import Dijkstra from '../../../src/application/solvers/pathfinding/Dijkstra';
import DepthFirstSearch from '../../../src/application/solvers/pathfinding/DepthFirstSearch';
import BreadthFirstSearch from '../../../src/application/solvers/pathfinding/BreadthFirstSearch';
import AStar from '../../../src/application/solvers/pathfinding/AStar';
import PathFindingProblemSolver from '../../../src/domain/problems/pathfinding/PathFindingProblemSolver';
import Grid from '../../../src/domain/problems/pathfinding/Grid';
import { TestRenderer } from '../../TestRenderer';
import Renderer from '../../../src/domain/renderer/Renderer';
import { mockRandomForEach } from 'jest-mock-random';

describe('PathFindingProblemSolvers', () => {
    const renderer: Renderer = new TestRenderer();

    describe.each([
        [ 'Dijkstra', Dijkstra ],
        [ 'DepthFirstSearch', DepthFirstSearch ],
        [ 'BreadthFirstSearch', BreadthFirstSearch ],
        [ 'AStar', AStar ]
    ])('%s', (name: string, solverClass: new () => PathFindingProblemSolver) => {
        let data: Grid;
        let solver: PathFindingProblemSolver;

        // Mock math.random to return fixed values. Used to generate start and goal element.
        mockRandomForEach([ 0, 0, 0.99, 0.99 ]);

        beforeEach(() => {
            // start should be at 0,0
            // goal should be at 2,4
            data = new Grid(3, 5, renderer);
            // creating maze with following structure (1=wall,0=no wall)
            // 0,1,0
            // 0,1,0
            // 0,0,0
            // 0,1,0
            // 0,1,0
            data.getElement(1, 0)!.setWall();
            data.getElement(1, 1)!.setWall();
            data.getElement(1, 3)!.setWall();
            data.getElement(1, 4)!.setWall();

            solver = new solverClass();
        });

        it('should find path if path exists', async () => {
            const path = (await solver.solve(data)).getPath();

            expect(path.length).toBe(5);
            expect(path[0]).toEqual(data.getElement(2, 3)!);
            expect(path[1]).toEqual(data.getElement(2, 2)!);
            expect(path[2]).toEqual(data.getElement(1, 2)!);
            expect(path[3]).toEqual(data.getElement(0, 2)!);
            expect(path[4]).toEqual(data.getElement(0, 1)!);
        });

        it('should throw error if no path can be found', () => {
            expect.assertions(1);
            data.getElement(1,2)!.setWall();

            return expect(solver.solve(data)).rejects.toThrowError();
        });
    });
});
