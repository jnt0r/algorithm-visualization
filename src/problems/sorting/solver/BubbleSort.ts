import SortingProblemSolver from '../SortingProblemSolver';
import SortableData from '../SortableData';

export default class BubbleSort implements SortingProblemSolver {
    private data!: SortableData;

    async solve(data: SortableData): Promise<void> {
        this.data = data;

        for (let i = 0; i < data.getSize(); i++) {
            for (let j = 0; j < data.getSize() - i - 1; j++) {
                await data.markComparingElements(j, j + 1);

                // Swap elements if value of j is greater than value of j+1
                if (data.getElement(j).getValue() > data.getElement(j + 1).getValue()) {
                    await data.swap(j, j + 1);
                }

                data.resetComparingElements(j, j + 1);
            }

            // Mark mark last moved element as sorted
            data.getElement(data.getSize() - i - 1).setSorted();
        }
    }
}
