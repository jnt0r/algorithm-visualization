import BubbleSort from '../../../src/problems/sorting/solver/BubbleSort';
import SortableData from '../../../src/problems/sorting/SortableData';
import SortingProblemSolver from '../../../src/problems/sorting/SortingProblemSolver';
import SelectionSort from '../../../src/problems/sorting/solver/SelectionSort';
import QuickSort from '../../../src/problems/sorting/solver/QuickSort';
import { TestRenderer } from '../../TestRenderer';
import SortingProblem from '../../../src/problems/sorting/SortingProblem';

const renderer = new TestRenderer();

describe('SortingProblem', () => {
    test('solve should call solve on Solver with sortableData', () => {
        const solverMock: SortingProblemSolver = {
            solve: jest.fn(),
        };

        new SortingProblem(new TestRenderer()).solve(solverMock);

        expect(solverMock.solve).toHaveBeenCalledWith(undefined);
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
});
