import PathFindingProblemSolver from '../../../../src/domain/problems/pathfinding/PathFindingProblemSolver';
import Grid from '../../../../src/domain/problems/pathfinding/Grid';
import Path from '../../../../src/domain/problems/pathfinding/Path';
import PathFindingProblem from '../../../../src/domain/problems/pathfinding/PathFindingProblem';
import { TestRenderer } from '../../../TestRenderer';

describe('PathFindingProblem', () => {
    let problem: PathFindingProblem;

    beforeEach(() => {
        problem = new PathFindingProblem(new TestRenderer());
    });

    test('Path fields stat should increase by 1 per returned Path field', async () => {
        const stubSolver: PathFindingProblemSolver = {
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
        problem.generate();

        await problem.solve(stubSolver);

        expect(problem.getStats().getStat('Path fields')).toEqual(5);
    });
});
