import SortableData from '../../../../src/domain/problems/sorting/SortableData';
import CompareType, { EQUAL } from '../../../../src/domain/problems/CompareType';
import { TestRenderer } from '../../../TestRenderer';
import { instance, mock, verify } from 'ts-mockito';

describe('SortableData', () => {
    const renderer = new TestRenderer();
    let data: SortableData;

    beforeEach(() => {
        data = new SortableData([ 1, 2, 3, 4, 5 ], renderer);
    });

    describe('stats', () => {
        test('Comparisons stat is initialized with 0', () => {
            const comparisons = data.getStats().getStats()
                .get('comparisons');

            expect(comparisons).toEqual(0);
        });

        test('Comparisons stat is increased by 1 on compare', () => {
            data.compareElements(1, EQUAL, 2);
            const comparisons = data.getStats().getStats()
                .get('comparisons');

            expect(comparisons).toEqual(1);
        });

        test('Swaps stat is initialized with 0', () => {
            const swaps = data.getStats().getStats()
                .get('swaps');

            expect(swaps).toEqual(0);
        });

        test('Swaps stat is increased by 1 on swap', () => {
            data.swap(1, 2);
            const swaps = data.getStats().getStats()
                .get('swaps');

            expect(swaps).toEqual(1);
        });
    });


    describe('swap', () => {
        test('should swap given indexes', async () => {
            expect(data.getElement(4).getValue()).toEqual(5);
            expect(data.getElement(2).getValue()).toEqual(3);

            await data.swap(2, 4);

            expect(data.getElement(4).getValue()).toEqual(3);
            expect(data.getElement(2).getValue()).toEqual(5);
        });

        test('should call setIndex on swapped elements', async () => {
            const spyInstance1 = jest.spyOn(data.getElement(2), 'setIndex');
            const spyInstance2 = jest.spyOn(data.getElement(4), 'setIndex');

            await data.swap(2, 4);

            expect(spyInstance1).toHaveBeenCalledWith(4);
            expect(spyInstance2).toHaveBeenCalledWith(2);
        });
    });


    test('Compare should call CompareType.compare with elements at given indexes', () => {
        const compareTypeMock = mock<CompareType>();

        data.compareElements(1, instance(compareTypeMock), 2);

        verify(compareTypeMock.compare(2, 3)).once();
    });
});
