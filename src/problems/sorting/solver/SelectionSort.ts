import SortingProblemSolver from '../SortingProblemSolver';
import Renderer from '../../../renderer/Renderer';
import SortableData from '../SortableData';

export default class SelectionSort implements SortingProblemSolver {
    private renderer!: Renderer;
    private data!: SortableData;

    async solve(data: SortableData, renderer: Renderer): Promise<void> {
        this.renderer = renderer;
        this.data = data;

        for (let i = 0; i < data.getSize(); i++) {
            let smallestIndex = i;
            await data.markComparingElements(i);

            for (let j = i + 1; j < data.getSize(); j++) {
                await data.markComparingElements(j);

                if (data.getElement(j).getValue() < data.getElement(smallestIndex).getValue()) {
                    await renderer.animate(() => {
                        if (smallestIndex !== i) data.getElement(smallestIndex).unmark();
                        smallestIndex = j;
                        data.getElement(smallestIndex).setColor('#7f00ff');
                    });
                } else {
                    await renderer.animate(() => {
                        data.getElement(j).unmark();
                    });
                }
            }

            await data.swap(i, smallestIndex);

            await renderer.animate(() => {
                data.getElement(smallestIndex).unmark();
                data.getElement(i).setSorted();
            });
        }
    }
}
