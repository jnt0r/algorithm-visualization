import SortingProblemSolver from '../SortingProblemSolver';
import SortableData, { CompareType } from '../SortableData';

export default class SelectionSort implements SortingProblemSolver {
    private data!: SortableData;

    async solve(data: SortableData): Promise<void> {
        this.data = data;

        for (let i = 0; i < data.getSize(); i++) {
            let smallestIndex = i;
            await data.markComparingElements(i);

            for (let j = i + 1; j < data.getSize(); j++) {
                await data.markComparingElements(j);

                if (data.compareElements(j, smallestIndex, CompareType['<'])) {
                    if (smallestIndex !== i) data.getElement(smallestIndex).unmark();
                    smallestIndex = j;
                    data.getElement(smallestIndex).markPivot();
                    data.render();
                } else {
                    data.resetComparingElements(j);
                }
            }

            await data.swap(i, smallestIndex);

            data.getElement(smallestIndex).unmark();
            data.getElement(i).setSorted();
            data.render();
        }
    }
}
