import Grid from '../../../../src/domain/problems/pathfinding/Grid';
import PathFindingProblemStats from '../../../../src/domain/problems/pathfinding/PathFindingProblemStats';
import { TestRenderer } from '../../../TestRenderer';
import Renderer from '../../../../src/domain/renderer/Renderer';
import arrayContaining = jasmine.arrayContaining;

describe('Grid', () => {
    const renderer: Renderer = new TestRenderer();

    describe('stats', () => {
        let data: Grid;

        beforeEach(() => {
            data = new Grid(10, 10, renderer);
        });

        test('Checked fields stat should be initialized with 0', () => {
            expect(data.getStats().getStats()
                .get('Checked fields')).toEqual(0);
        });

        test('Checked fields stat should increase by 1 on getElement', () => {
            data.getElement(1, 1);
            expect(data.getStats().getStats()
                .get('Checked fields')).toEqual(1);
        });

        test('Visited fields stat should be initialized with 0', () => {
            expect(data.getStats().getStats()
                .get('Visited fields')).toEqual(0);
        });

        test('Visited fields stat should increase by 1 on getElement', () => {
            data.visitField(data.getElement(1, 1)!);
            expect(data.getStats().getStats()
                .get('Visited fields')).toEqual(1);
        });

        test('Path fields stat should be initialized with 0', () => {
            expect(data.getStats().getStats()
                .get('Path fields')).toEqual(0);
        });
    });

    describe('getNeighboursOfElement', () => {
        let grid: Grid;

        beforeEach(() => {
            grid = new Grid(2, 1, renderer);
        });

        test('should return empty array when no neighbours', () => {
            expect(grid.getNeighboursOfElement(grid.getElement(0, 0)!)).toEqual([]);
        });

        test('should return right neighbour', () => {
            expect(grid.getNeighboursOfElement(grid.getElement(0, 0)!)).toEqual([ grid.getElement(1, 0) ]);
        });

        test('should return left neighbour', () => {
            expect(grid.getNeighboursOfElement(grid.getElement(1, 0)!)).toEqual([ grid.getElement(0, 0) ]);
        });

        test('should return upper neighbour', () => {
            expect(grid.getNeighboursOfElement(grid.getElement(0, 0)!)).toEqual([ grid.getElement(0, 1) ]);
        });

        test('should return lower neighbour', () => {
            expect(grid.getNeighboursOfElement(grid.getElement(0, 1)!)).toEqual([ grid.getElement(0, 0) ]);
        });

        test('should return all neighbours', () => {
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
