import SortingProblemSolver from '../SortingProblemSolver';
import Renderer from '../../../renderer/Renderer';
import SortableData from '../SortableData';

export default class BubbleSort implements SortingProblemSolver {
    async solve(data: SortableData, renderer: Renderer): Promise<void> {
        for (let i = 0; i < data.getSize(); i++) {
            for (let j = 0; j < data.getSize() - i - 1; j++) {
                await renderer.animate(() => {
                    data.getElement(j).markRed();
                    data.getElement(j + 1).markRed();
                });

                if (data.getElement(j).getValue() > data.getElement(j + 1).getValue()) {
                    await data.swap(j, j + 1, renderer);
                }

                await renderer.animate(() => {
                    data.getElement(j).unmark();
                    data.getElement(j + 1).unmark();
                });
            }
            data.getElement(data.getSize() - i - 1).setSorted();
        }
    }
}
