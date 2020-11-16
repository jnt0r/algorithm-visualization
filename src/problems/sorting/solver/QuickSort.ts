import SortingProblemSolver from '../SortingProblemSolver';
import Renderer from '../../../renderer/Renderer';
import Bar from '../Bar';

export default class QuickSort implements SortingProblemSolver {
    private values!: Bar[];
    private renderer!: Renderer;

    async solve(values: Bar[], renderer: Renderer): Promise<void> {
        this.values = values;
        this.renderer = renderer;

        await this.quicksort(0, values.length - 1);
    }

    private async quicksort(left: number, right: number): Promise<void> {
        if (left < right) {
            const divider = await this.divide(left, right);
            await this.quicksort(left, divider - 1);
            await this.quicksort(divider + 1, right);
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

        // Visualize pivot element
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
                await this.swap(i, j);
            } else {
                await this.renderer.animate(() => {
                    this.values[i].unmark();
                    this.values[j].unmark();
                });
            }
        }

        if (this.values[i].getValue() > pivot.getValue()) {
            await this.swap(i, right);

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

    private async swap(a: number, b: number) {
        const temp = this.values[a];
        this.values[a] = this.values[b];
        this.values[b] = temp;
        await this.renderer.swapElementsById(this.values[a].getId(), this.values[b].getId());
    }
}
