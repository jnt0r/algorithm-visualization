import SortingProblemSolver from '../SortingProblemSolver';
import Renderer from '../../../renderer/Renderer';
import SortableData from '../SortableData';

export default class BubbleSort implements SortingProblemSolver {
    private renderer!: Renderer;
    private data!: SortableData;

    async solve(data: SortableData, renderer: Renderer): Promise<void> {
        this.renderer = renderer;
        this.data = data;

        for (let i = 0; i < data.getSize(); i++) {
            for (let j = 0; j < data.getSize() - i - 1; j++) {
                await data.markComparingElements(j, j + 1);

                // Swap elements if value of j is greater than value of j+1
                if (data.getElement(j).getValue() > data.getElement(j + 1).getValue()) {
                    await data.swap(j, j + 1);
                }

                await data.resetComparingElements(j, j + 1);
            }

            // Mark mark last moved element as sorted
            data.getElement(data.getSize() - i - 1).setSorted();
        }
    }
}
