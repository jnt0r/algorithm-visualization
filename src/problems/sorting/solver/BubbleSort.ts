import SortingProblemSolver from '../SortingProblemSolver';
import SortableData from '../SortableData';
import { GREATER } from '../../CompareType';

export default class BubbleSort implements SortingProblemSolver {
    async solve(data: SortableData): Promise<void> {
        for (let i = 0; i < data.getSize(); i++) {
            for (let j = 0; j < data.getSize() - i - 1; j++) {
                await data.markComparingElements(j, j + 1);

                // Swap elements if value of j is greater than value of j+1
                if (data.compareElements(j, GREATER, j + 1)) {
                    await data.swap(j, j + 1);
                }

                data.resetComparingElements(j, j + 1);
            }

            // Mark last moved element as sorted
            data.getElement(data.getSize() - i - 1).setSorted();
        }
        await data.renderAnimated();
    }
}
