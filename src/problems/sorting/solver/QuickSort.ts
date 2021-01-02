import SortingProblemSolver from '../SortingProblemSolver';
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
        }
    }

    private async divide(left: number, right: number): Promise<number> {
        let i = left;
        let j = right - 1;
        const pivot = right;

        // Visualize pivot element
        this.data.getElement(pivot).markPivot();
        await this.data.renderAnimated();

        while (i < j) {
            await this.data.markComparingElements(i, j);

            while (i < right && this.data.compareElements(i, '<', pivot)) {
                this.data.getElement(i).unmark();
                i++;
                await this.data.markComparingElements(i);
            }
            while (j > left && this.data.compareElements(j, '>=', pivot)) {
                this.data.getElement(j).unmark();
                j--;
                await this.data.markComparingElements(j);
            }

            if (i < j) {
                await this.data.swap(i, j);
            } else {
                this.data.resetComparingElements(i, j);
            }
        }

        if (this.data.compareElements(i, '>', pivot)) {
            await this.data.swap(i, pivot);
            this.data.getElement(pivot).setSorted();
        } else {
            this.data.getElement(pivot).unmark();
            this.data.getElement(i).setSorted();
        }

        await this.data.renderAnimated();

        return i;
    }
}
