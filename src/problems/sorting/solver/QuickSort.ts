import SortingProblemSolver from '../SortingProblemSolver';
import Renderer from '../../../renderer/Renderer';
import SortableData from '../SortableData';

export default class QuickSort implements SortingProblemSolver {
    private data!: SortableData;

    async solve(data: SortableData): Promise<void> {
        this.data = data;

        return this.quicksort(0, data.getSize() - 1);
    }

    private async quicksort(left: number, right: number): Promise<void> {
        if (left < right) {
            const divider = await this.divide(left, right);
            // Process left and right part simultaneously
            await Promise.all([this.quicksort(left, divider - 1), this.quicksort(divider + 1, right)]);
        }

        if (left === right) {
            this.data.getElement(left).setSorted();
            this.data.render();
            // await this.data.renderAnimated();
        }
    }

    private async divide(left: number, right: number): Promise<number> {
        let i = left;
        let j = right - 1;
        const pivot = this.data.getElement(right);

        // Visualize pivot element
        pivot.markPivot();
        this.data.render();

        while (i < j) {
            await this.data.markComparingElements(i, j);

            while (i < right && this.data.getElement(i).getValue() < pivot.getValue()) {
                this.data.getElement(i).unmark();
                i++;
                await this.data.markComparingElements(i);
            }
            while (j > left && this.data.getElement(j).getValue() >= pivot.getValue()) {
                this.data.getElement(j).unmark();
                j--;
                await this.data.markComparingElements(i);
            }

            if (i < j) {
                await this.data.swap(i, j);
            } else {
                this.data.resetComparingElements(i, j);
            }
        }

        if (this.data.getElement(i).getValue() > pivot.getValue()) {
            await this.data.swap(i, right);
            pivot.setSorted();
            this.data.render();
        } else {
            pivot.unmark();
            this.data.getElement(i).setSorted();
            this.data.render();
        }

        return i;
    }
}
