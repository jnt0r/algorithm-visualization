import BubbleSort from '../../../src/problems/sorting/solver/BubbleSort';
import SortableData from '../../../src/problems/sorting/SortableData';
import SortingProblemSolver from '../../../src/problems/sorting/SortingProblemSolver';
import { TestRenderer } from '../../TestRenderer';
import SortingProblem from '../../../src/problems/sorting/SortingProblem';
import { anyOfClass, instance, mock, verify } from 'ts-mockito';
import SelectionSort from '../../../src/problems/sorting/solver/SelectionSort';
import QuickSort from '../../../src/problems/sorting/solver/QuickSort';

describe('SortingProblem', () => {
    const renderer = new TestRenderer();

    test('solve should call solver.solve with generated sortableData', async () => {
        const sortingProblem = new SortingProblem(renderer);
        const solverMock = mock<SortingProblemSolver>();

        sortingProblem.generate();
        await sortingProblem.solve(instance(solverMock));

        verify(solverMock.solve(anyOfClass(SortableData))).once();
    });

    describe('Solver', () => {
        // Parameterized test for each SortingProblemSolver implementation
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
});
