import SortableData from '../../../../src/domain/problems/sorting/SortableData';
import SortingProblemSolver from '../../../../src/domain/problems/sorting/SortingProblemSolver';
import { TestRenderer } from '../../../TestRenderer';
import SortingProblem from '../../../../src/domain/problems/sorting/SortingProblem';
import { anyOfClass, instance, mock, verify } from 'ts-mockito';

describe('SortingProblem', () => {
    const renderer = new TestRenderer();

    test('solve should call solver.solve with generated sortableData', async () => {
        const sortingProblem = new SortingProblem(renderer);
        const solverMock = mock<SortingProblemSolver>();

        sortingProblem.generate();
        await sortingProblem.solve(instance(solverMock));

        verify(solverMock.solve(anyOfClass(SortableData))).once();
    });
});
