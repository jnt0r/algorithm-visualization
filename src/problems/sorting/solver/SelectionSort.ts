import SortingProblemSolver from '../SortingProblemSolver';
import Renderer from '../../../renderer/Renderer';
import SortableData from '../SortableData';

export default class SelectionSort implements SortingProblemSolver {
    async solve(data: SortableData, renderer: Renderer): Promise<void> {
        for (let i = 0; i < data.getSize(); i++) {
            let smallestIndex = i;
            await renderer.animate(() => {
                data.getElement(i).markRed();
            });

            for (let j = i + 1; j < data.getSize(); j++) {
                await renderer.animate(() => {
                    data.getElement(j).markRed();
                });

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

            await data.swap(i, smallestIndex, renderer);

            await renderer.animate(() => {
                data.getElement(smallestIndex).unmark();
                data.getElement(i).setSorted();
            });
        }
    }
}
