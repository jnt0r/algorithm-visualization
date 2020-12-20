import SortingProblemSolver from '../SortingProblemSolver';
import Renderer from '../../../renderer/Renderer';
import SortableData from '../SortableData';

export default class QuickSort implements SortingProblemSolver {
    private data!: SortableData;
    private renderer!: Renderer;

    async solve(data: SortableData, renderer: Renderer): Promise<void> {
        this.data = data;
        this.renderer = renderer;

        return this.quicksort(0, data.getSize() - 1);
    }

    private async quicksort(left: number, right: number): Promise<void> {
        if (left < right) {
            const divider = await this.divide(left, right);
            await this.quicksort(left, divider - 1);
            await this.quicksort(divider + 1, right);
        }

        if (left === right) {
            await this.renderer.animate(() => {
                this.data.getElement(left).setSorted();
            });
        }
    }

    private async divide(left: number, right: number): Promise<number> {
        let i = left;
        let j = right - 1;
        const pivot = this.data.getElement(right);

        // Visualize pivot element
        await this.renderer.animate(() => {
            pivot.setColor('#7f00ff');
        });

        while (i < j) {
            await this.renderer.animate(() => {
                this.data.getElement(i).markComparing();
                this.data.getElement(j).markComparing();
            });

            while (i < right && this.data.getElement(i).getValue() < pivot.getValue()) {
                await this.renderer.animate(() => {
                    this.data.getElement(i).unmark();
                    i++;
                    this.data.getElement(i).markComparing();
                });
            }
            while (j > left && this.data.getElement(j).getValue() >= pivot.getValue()) {
                await this.renderer.animate(() => {
                    this.data.getElement(j).unmark();
                    j--;
                    this.data.getElement(j).markComparing();
                });
            }

            if (i < j) {
                await this.data.swap(i, j);
            } else {
                await this.renderer.animate(() => {
                    this.data.getElement(i).unmark();
                    this.data.getElement(j).unmark();
                });
            }
        }

        if (this.data.getElement(i).getValue() > pivot.getValue()) {
            await this.data.swap(i, right);

            await this.renderer.animate(() => {
                pivot.setSorted();
            });
        } else {
            await this.renderer.animate(() => {
                pivot.unmark();
                this.data.getElement(i).setSorted();
            });
        }

        return i;
    }
}
