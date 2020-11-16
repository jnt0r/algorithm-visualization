import SortingProblemSolver from '../SortingProblemSolver';
import Renderer from '../../../renderer/Renderer';
import Bar from '../Bar';

export default class QuickSort implements SortingProblemSolver {
    private values!: Bar[];
    private renderer!: Renderer;

    async solve(values: Bar[], renderer: Renderer): Promise<void> {
        this.values = values;
        this.renderer = renderer;

        await this.sort(0, values.length - 1);
    }

    private async sort(left: number, right: number): Promise<void> {
        if (left < right) {
            const divider = await this.divide(left, right);
            await this.sort(left, divider - 1);
            await this.sort(divider + 1, right);
        }
        if (left === right) {
            await this.renderer.animate(() => {
                this.values[left].setSorted();
            });
        }
    }

    private async divide(left: number, right: number): Promise<number> {
        let i = left;
        let j = right - 1;
        const pivot = this.values[right];

        await this.renderer.animate(() => {
            pivot.setColor('#7f00ff');
        });

        while (i < j) {
            await this.renderer.animate(() => this.values[i].markRed());
            await this.renderer.animate(() => this.values[j].markRed());

            while (i < right && this.values[i].getValue() < pivot.getValue()) {
                await this.renderer.animate(() => this.values[i].unmark());
                i++;
                await this.renderer.animate(() => this.values[i].markRed());
            }
            while (j > left && this.values[j].getValue() >= pivot.getValue()) {
                await this.renderer.animate(() => this.values[j].unmark());
                j--;
                await this.renderer.animate(() => this.values[j].markRed());
            }

            if (i < j) {
                const temp = this.values[i];
                this.values[i] = this.values[j];
                this.values[j] = temp;
                await this.renderer.swapElementsById(this.values[i].getId(), this.values[j].getId());
            } else {
                await this.renderer.animate(() => {
                    this.values[i].unmark();
                    this.values[j].unmark();
                });
            }
        }

        if (this.values[i].getValue() > pivot.getValue()) {
            const temp = this.values[i];
            this.values[i] = this.values[right];
            this.values[right] = temp;
            await this.renderer.swapElementsById(this.values[i].getId(), this.values[right].getId());
            await this.renderer.animate(() => {
                pivot.setSorted();
                this.values[i].setSorted();
                this.values[right].setSorted();
            });
        } else {
            await this.renderer.animate(() => {
                pivot.unmark();
                this.values[i].setSorted();
            });
        }

        return i;
    }
}
