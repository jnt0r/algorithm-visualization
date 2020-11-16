import SortingProblemSolver from '../SortingProblemSolver';
import Bar from '../Bar';
import Renderer from '../../../renderer/Renderer';

export default class BubbleSort implements SortingProblemSolver {
    async solve(values: Bar[], renderer: Renderer): Promise<void> {
        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < values.length - i - 1; j++) {
                await renderer.animate(() => {
                    values[j].markRed();
                    values[j + 1].markRed();
                });

                if (values[j].getValue() > values[j + 1].getValue()) {
                    const temp = values[j];
                    values[j] = values[j + 1];
                    values[j + 1] = temp;

                    await renderer.swapElementsById(values[j].getId(), values[j + 1].getId());
                }

                await renderer.animate(() => {
                    values[j].unmark();
                    values[j + 1].unmark();
                });
            }
            values[values.length - i - 1].setSorted();
        }
    }
}
