import SortingProblem from '../../../../src/domain/problems/sorting/SortingProblem';
import { TestRenderer } from '../../../TestRenderer';
import SortingProblemSolver from '../../../../src/domain/problems/sorting/SortingProblemSolver';
import SortableData from '../../../../src/domain/problems/sorting/SortableData';

describe('SortingProblem', () => {
    let problem: SortingProblem;

    beforeEach(() => {
        problem = new SortingProblem(new TestRenderer());
    });

    test('generate should create SortableData element with 20 elements', async () => {
        problem.generate();
        problem.reset();

        let problemData!: SortableData;

        await problem.solve(new class implements SortingProblemSolver {async solve(data: SortableData): Promise<void> {
            problemData = data;
        }});

        expect(problemData).toBeDefined();
        expect(problemData.getSize()).toBe(20);
    });
});
