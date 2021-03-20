import Grid from '../../../src/problems/pathfinding/Grid';
import PathFindingProblemStats from '../../../src/problems/pathfinding/PathFindingProblemStats';
import { TestRenderer } from '../../TestRenderer';
import arrayContaining = jasmine.arrayContaining;

describe('Grid', () => {
    const testRenderer = new TestRenderer();

    describe('getNeighboursOfElement', () => {
        test('should return empty array when no neighbours', () => {
            const grid = new Grid(1, 1, testRenderer);

            expect(grid.getNeighboursOfElement(grid.getElement(0, 0)!)).toEqual([]);
        });

        test('should return right neighbour', () => {
            const grid = new Grid(2, 1, testRenderer);

            expect(grid.getNeighboursOfElement(grid.getElement(0, 0)!)).toEqual([ grid.getElement(1, 0) ]);
        });

        test('should return left neighbour', () => {
            const grid = new Grid(2, 1, testRenderer);

            expect(grid.getNeighboursOfElement(grid.getElement(1, 0)!)).toEqual([ grid.getElement(0, 0) ]);
        });

        test('should return upper neighbour', () => {
            const grid = new Grid(1, 2, testRenderer);

            expect(grid.getNeighboursOfElement(grid.getElement(0, 0)!)).toEqual([ grid.getElement(0, 1) ]);
        });

        test('should return lower neighbour', () => {
            const grid = new Grid(1, 2, testRenderer);

            expect(grid.getNeighboursOfElement(grid.getElement(0, 1)!)).toEqual([ grid.getElement(0, 0) ]);
        });

        test('should return all neighbours', () => {
            const grid = new Grid(3, 3, testRenderer);

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
            const grid = new Grid(10, 10, testRenderer);
            grid.getStats().addPathField();
            grid.getStats().addCheckedField();

            grid.reset();

            expect(grid.getStats()).toEqual(new PathFindingProblemStats());
        });

        test('should reset all elements', () => {
            const grid = new Grid(2, 2, testRenderer);

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
