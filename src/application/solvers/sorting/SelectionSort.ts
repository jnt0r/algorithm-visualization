import SortingProblemSolver from '../../../domain/problems/sorting/SortingProblemSolver';
import SortableData from '../../../domain/problems/sorting/SortableData';
import { LESS } from '../../../domain/problems/CompareType';

export default class SelectionSort implements SortingProblemSolver {
    async solve(data: SortableData): Promise<void> {
        for (let i = 0; i < data.getSize(); i++) {
            await data.markComparingElements(i);

            const smallestIndex = await this.findSmallestElementInRemainingElements(i, data);

            await data.swap(i, smallestIndex);

            data.getElement(smallestIndex).unmark();
            data.getElement(i).setSorted();
            data.render();
        }
    }

    private async findSmallestElementInRemainingElements(i: number, data: SortableData) {
        let smallestIndex = i;

        for (let j = i + 1; j < data.getSize(); j++) {
            await data.markComparingElements(j);

            if (data.compareElements(j, LESS, smallestIndex)) {
                if (smallestIndex !== i) data.getElement(smallestIndex).unmark();
                smallestIndex = j;
                data.getElement(smallestIndex).markPivot();
                data.render();
            } else {
                data.resetComparingElements(j);
            }
        }

        return smallestIndex;
    }
}
