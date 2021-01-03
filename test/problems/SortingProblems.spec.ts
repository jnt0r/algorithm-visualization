import BubbleSort from '../../src/problems/sorting/solver/BubbleSort';
import SortableData from '../../src/problems/sorting/SortableData';
import SortingProblemSolver from '../../src/problems/sorting/SortingProblemSolver';
import SelectionSort from '../../src/problems/sorting/solver/SelectionSort';
import QuickSort from '../../src/problems/sorting/solver/QuickSort';
import { TestRenderer } from '../TestRenderer';

const renderer = new TestRenderer();

describe('stats', () => {
    test('Comparisons is initialized with 0', () => {
        const data = new SortableData([1, 2, 3, 4, 5], renderer);
        expect(data.getStats().getStats().get('comparisons')).toEqual(0);
    });
    test('Comparisons is increased by 1 on compare', () => {
        const data = new SortableData([1, 2, 3, 4, 5], renderer);
        data.compareElements(1, '=', 2);
        expect(data.getStats().getStats().get('comparisons')).toEqual(1);
    });
    test('Swaps is initialized with 0', () => {
        const data = new SortableData([1, 2, 3, 4, 5], renderer);
        expect(data.getStats().getStats().get('swaps')).toEqual(0);
    });
    test('Swaps is increased by 1 on swap', () => {
        const data = new SortableData([1, 2, 3, 4, 5], renderer);
        data.swap(1, 2);
        expect(data.getStats().getStats().get('swaps')).toEqual(1);
    });
});

describe('Compare', () => {
    const data = new SortableData([0, 1, 2, 3, 4], renderer);

    test('1 = 2 is false', () => {
        expect(data.compareElements(1, '=', 2)).toBeFalsy();
    });
    test('1 = 1 is true', () => {
        expect(data.compareElements(1, '=', 1)).toBeTruthy();
    });

    test('1 < 2 is true', () => {
        expect(data.compareElements(1, '<', 2)).toBeTruthy();
    });
    test('2 < 1 is false', () => {
        expect(data.compareElements(2, '<', 1)).toBeFalsy();
    });
    test('1 < 1 is false', () => {
        expect(data.compareElements(1, '<', 1)).toBeFalsy();
    });

    test('1 <= 2 is true', () => {
        expect(data.compareElements(1, '<=', 2)).toBeTruthy();
    });
    test('2 <= 1 is false', () => {
        expect(data.compareElements(2, '<=', 1)).toBeFalsy();
    });
    test('1 <= 1 is true', () => {
        expect(data.compareElements(1, '<=', 1)).toBeTruthy();
    });

    test('2 > 1 is true', () => {
        expect(data.compareElements(2, '>', 1)).toBeTruthy();
    });
    test('1 > 2 is false', () => {
        expect(data.compareElements(1, '>', 2)).toBeFalsy();
    });
    test('1 > 1 is false', () => {
        expect(data.compareElements(1, '>', 1)).toBeFalsy();
    });

    test('2 >= 1 is true', () => {
        expect(data.compareElements(2, '>=', 1)).toBeTruthy();
    });
    test('1 >= 2 is false', () => {
        expect(data.compareElements(1, '>=', 2)).toBeFalsy();
    });
    test('1 >= 1 is true', () => {
        expect(data.compareElements(1, '>=', 1)).toBeTruthy();
    });
});

describe('Swap', () => {
    const data = new SortableData([0, 1, 2, 3, 4], renderer);

    test('should swap given indexes', () => {
        expect(data.getElement(4).getValue()).toEqual(4);
        expect(data.getElement(2).getValue()).toEqual(2);

        data.swap(2, 4);

        expect(data.getElement(4).getValue()).toEqual(2);
        expect(data.getElement(2).getValue()).toEqual(4);
    });
});

const sortedData = new SortableData([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], renderer);
test('creation', () => {
    expect(sortedData).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(sortedData).toBeSorted();
});

test('BubbleSort', async () => {
    const sorter: SortingProblemSolver = new BubbleSort();
    const data = new SortableData([9, 1, 4, 8, 10, 2, 3, 6, 5, 7], renderer);

    await sorter.solve(data);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(data).toBeSorted();
});

test('SelectionSort', async () => {
    const sorter: SortingProblemSolver = new SelectionSort();
    const data = new SortableData([9, 1, 4, 8, 10, 2, 3, 6, 5, 7], renderer);

    await sorter.solve(data);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(data).toBeSorted();
});

test('QuickSort', async () => {
    const sorter: SortingProblemSolver = new QuickSort();
    const data = new SortableData([9, 1, 4, 8, 10, 2, 3, 6, 5, 7], renderer);

    await sorter.solve(data);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(data).toBeSorted();
});
