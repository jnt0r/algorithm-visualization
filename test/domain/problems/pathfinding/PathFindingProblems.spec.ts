import Renderer from '../../../../src/domain/renderer/Renderer';
import { TestRenderer } from '../../../TestRenderer';
import Grid from '../../../../src/domain/problems/pathfinding/Grid';
import PathFindingProblemSolver from '../../../../src/domain/problems/pathfinding/PathFindingProblemSolver';
import Path from '../../../../src/domain/problems/pathfinding/Path';
import PathFindingProblem from '../../../../src/domain/problems/pathfinding/PathFindingProblem';

describe('PathFindingProblem', () => {
    const renderer: Renderer = new TestRenderer();

    test('Checked fields stat should be initialized with 0', () => {
        const data = new Grid(10, 10, renderer);
        expect(data.getStats().getStats()
            .get('Checked fields')).toEqual(0);
    });

    test('Checked fields stat should increase by 1 on getElement', () => {
        const data = new Grid(10, 10, renderer);
        data.getElement(1, 1);
        expect(data.getStats().getStats()
            .get('Checked fields')).toEqual(1);
    });

    test('Visited fields stat should be initialized with 0', () => {
        const data = new Grid(10, 10, renderer);
        expect(data.getStats().getStats()
            .get('Visited fields')).toEqual(0);
    });

    test('Visited fields stat should increase by 1 on getElement', () => {
        const data = new Grid(10, 10, renderer);
        data.visitField(data.getElement(1, 1)!);
        expect(data.getStats().getStats()
            .get('Visited fields')).toEqual(1);
    });

    test('Path fields stat should be initialized with 0', () => {
        const data = new Grid(10, 10, renderer);
        expect(data.getStats().getStats()
            .get('Path fields')).toEqual(0);
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
        pathFindingProblem.render();

        await pathFindingProblem.solve(solverMock);

        expect(pathFindingProblem.getStats().getStats()
            .get('Path fields')).toEqual(5);
    });
});
