import SortingProblemSolver from '../SortingProblemSolver';
import Bar from '../Bar';
import Renderer from '../../../renderer/Renderer';

export default class SelectionSort implements SortingProblemSolver {
    async solve(values: Bar[], renderer: Renderer): Promise<void> {
        for (let i = 0; i < values.length; i++) {
            let smallestIndex = i;
            await renderer.animate(() => {
                values[i].markRed();
            });

            for (let j = i + 1; j < values.length; j++) {
                await renderer.animate(() => {
                    values[j].markRed();
                });

                if (values[j].getValue() < values[smallestIndex].getValue()) {
                    await renderer.animate(() => {
                        if (smallestIndex !== i) values[smallestIndex].unmark();
                        smallestIndex = j;
                        values[smallestIndex].markGreen();
                    });
                } else {
                    await renderer.animate(() => {
                        values[j].unmark();
                    });
                }
            }

            const temp = values[i];
            values[i] = values[smallestIndex];
            values[smallestIndex] = temp;

            await renderer.swapElementsById(values[i].getId(), values[smallestIndex].getId());

            await renderer.animate(() => {
                values[i].markGreen();
                values[smallestIndex].unmark();
            });
        }
    }
}
