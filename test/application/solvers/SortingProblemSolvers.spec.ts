import BubbleSort from '../../../src/application/solvers/sorting/BubbleSort';
import SelectionSort from '../../../src/application/solvers/sorting/SelectionSort';
import QuickSort from '../../../src/application/solvers/sorting/QuickSort';
import SortingProblemSolver from '../../../src/domain/problems/sorting/SortingProblemSolver';
import SortableData from '../../../src/domain/problems/sorting/SortableData';
import { TestRenderer } from '../../TestRenderer';
import Renderer from '../../../src/domain/renderer/Renderer';

describe('SortingProblemSolvers', () => {
    const renderer: Renderer = new TestRenderer();
    test.each([
        [ 'BubbleSort', new BubbleSort() ],
        [ 'SelectionSort', new SelectionSort() ],
        [ 'QuickSort', new QuickSort() ],
    ])('%s', async (name: string, solver: SortingProblemSolver) => {
        const data = new SortableData([ 9, 1, 4, 8, 10, 2, 3, 6, 5, 7 ], renderer);

        await solver.solve(data);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(data).toBeSorted();
    });
});
