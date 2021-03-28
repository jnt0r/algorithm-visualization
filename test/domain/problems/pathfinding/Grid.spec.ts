import Grid from '../../../../src/domain/problems/pathfinding/Grid';
import PathFindingProblemStats from '../../../../src/domain/problems/pathfinding/PathFindingProblemStats';
import { TestRenderer } from '../../../TestRenderer';
import PathFindingProblemSolver from '../../../../src/domain/problems/pathfinding/PathFindingProblemSolver';
import Path from '../../../../src/domain/problems/pathfinding/Path';
import PathFindingProblem from '../../../../src/domain/problems/pathfinding/PathFindingProblem';
import arrayContaining = jasmine.arrayContaining;
import Renderer from '../../../../src/domain/renderer/Renderer';

describe('Grid', () => {
    const renderer: Renderer = new TestRenderer();

    describe('stats', () => {
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

            await pathFindingProblem.solve(solverMock);

            expect(pathFindingProblem.getStats().getStats()
                .get('Path fields')).toEqual(5);
        });
    });

    describe('getNeighboursOfElement', () => {
        test('should return empty array when no neighbours', () => {
            const grid = new Grid(1, 1, renderer);

            expect(grid.getNeighboursOfElement(grid.getElement(0, 0)!)).toEqual([]);
        });

        test('should return right neighbour', () => {
            const grid = new Grid(2, 1, renderer);

            expect(grid.getNeighboursOfElement(grid.getElement(0, 0)!)).toEqual([ grid.getElement(1, 0) ]);
        });

        test('should return left neighbour', () => {
            const grid = new Grid(2, 1, renderer);

            expect(grid.getNeighboursOfElement(grid.getElement(1, 0)!)).toEqual([ grid.getElement(0, 0) ]);
        });

        test('should return upper neighbour', () => {
            const grid = new Grid(1, 2, renderer);

            expect(grid.getNeighboursOfElement(grid.getElement(0, 0)!)).toEqual([ grid.getElement(0, 1) ]);
        });

        test('should return lower neighbour', () => {
            const grid = new Grid(1, 2, renderer);

            expect(grid.getNeighboursOfElement(grid.getElement(0, 1)!)).toEqual([ grid.getElement(0, 0) ]);
        });

        test('should return all neighbours', () => {
            const grid = new Grid(3, 3, renderer);

            const neighbours = grid.getNeighboursOfElement(grid.getElement(1, 1)!);

            expect(neighbours.length).toEqual(4);
            expect(neighbours).toEqual(
                arrayContaining([
                    grid.getElement(2, 1),
                    grid.getElement(0, 1),
                    grid.getElement(1, 2),
                    grid.getElement(1, 0),
                ]),
            );
        });
    });

    describe('reset', () => {
        test('should reset stats', () => {
            const grid = new Grid(10, 10, renderer);
            grid.getStats().addPathField();
            grid.getStats().addCheckedField();

            grid.reset();

            expect(grid.getStats()).toEqual(new PathFindingProblemStats());
        });

        test('should reset all elements', () => {
            const grid = new Grid(2, 2, renderer);

            const spy1 = jest.spyOn(grid.getElement(0, 0)!, 'reset');
            const spy2 = jest.spyOn(grid.getElement(0, 1)!, 'reset');
            const spy3 = jest.spyOn(grid.getElement(1, 0)!, 'reset');
            const spy4 = jest.spyOn(grid.getElement(1, 1)!, 'reset');

            grid.reset();

            expect(spy1).toHaveBeenCalled();
            expect(spy2).toHaveBeenCalled();
            expect(spy3).toHaveBeenCalled();
            expect(spy4).toHaveBeenCalled();
        });
    });
});
