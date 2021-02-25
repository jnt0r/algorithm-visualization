import SortableData from '../../../src/problems/sorting/SortableData';
import CompareType, { EQUAL } from '../../../src/problems/CompareType';
import { TestRenderer } from '../../TestRenderer';

describe('SortableData', () => {
    const renderer = new TestRenderer();
    let data: SortableData;

    beforeEach(() => {
        data = new SortableData([1, 2, 3, 4, 5], renderer);
    });

    test('Comparisons stat is initialized with 0', () => {
        const comparisons = data.getStats().getStats().get('comparisons');

        expect(comparisons).toEqual(0);
    });

    test('Comparisons stat is increased by 1 on compare', () => {
        data.compareElements(1, EQUAL, 2);
        const comparisons = data.getStats().getStats().get('comparisons');

        expect(comparisons).toEqual(1);
    });

    test('Swaps stat is initialized with 0', () => {
        const swaps = data.getStats().getStats().get('swaps');

        expect(swaps).toEqual(0);
    });

    test('Swaps stat is increased by 1 on swap', () => {
        data.swap(1, 2);
        const swaps = data.getStats().getStats().get('swaps');

        expect(swaps).toEqual(1);
    });

    test('swap should swap given indexes', () => {
        expect(data.getElement(4).getValue()).toEqual(5);
        expect(data.getElement(2).getValue()).toEqual(3);

        data.swap(2, 4);

        expect(data.getElement(4).getValue()).toEqual(3);
        expect(data.getElement(2).getValue()).toEqual(5);
    });

    test('Compare should call CompareType.compare with elements at given indexes', () => {
        const compareTypeMock: CompareType = {
            compare: jest.fn(),
        };

        data.compareElements(1, compareTypeMock, 2);

        expect(compareTypeMock.compare).toHaveBeenCalledWith(2, 3);
    });
});
