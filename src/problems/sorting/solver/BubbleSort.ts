import SortingProblemSolver from '../SortingProblemSolver';
import SortableData from '../SortableData';
import { GREATER } from '../../CompareType';

export default class BubbleSort implements SortingProblemSolver {
    private data!: SortableData;

    async solve(data: SortableData): Promise<void> {
        this.data = data;

        for (let i = 0; i < data.getSize(); i++) {
            for (let j = 0; j < data.getSize() - i - 1; j++) {
                await data.markComparingElements(j, j + 1);

                await this.swapElementsIfValueOfAGreaterB(j, j + 1);

                data.resetComparingElements(j, j + 1);
            }

            // Mark last moved element as sorted
            data.getElement(data.getSize() - i - 1).setSorted();
        }
        await data.renderAnimated();
    }

    private async swapElementsIfValueOfAGreaterB(a: number, b: number): Promise<void> {
        if (this.data.compareElements(a, GREATER, b)) {
            return this.data.swap(a, b);
        }
    }
}
