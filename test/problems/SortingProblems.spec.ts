import BubbleSort from '../../src/problems/sorting/solver/BubbleSort';
import SortableData from '../../src/problems/sorting/SortableData';
import SortingProblemSolver from '../../src/problems/sorting/SortingProblemSolver';
import SelectionSort from '../../src/problems/sorting/solver/SelectionSort';
import QuickSort from '../../src/problems/sorting/solver/QuickSort';
import { TestRenderer } from '../TestRenderer';

const renderer = new TestRenderer();

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
