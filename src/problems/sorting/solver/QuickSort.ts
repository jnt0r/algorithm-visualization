import SortingProblemSolver from '../SortingProblemSolver';
import SortableData from '../SortableData';
import { GREATER, GREATER_EQUAL, LESS } from '../../CompareType';

export default class QuickSort implements SortingProblemSolver {
    private data!: SortableData;

    async solve(data: SortableData): Promise<void> {
        this.data = data;

        return this.quicksort(0, data.getSize() - 1);
    }

    /**
     * Recursively sorts the data between left bound and right bound by dividing it into smaller pieces.
     *
     * @param left The index of the left bound (inclusive)
     * @param right The index of the right bound (inclusive)
     * @private
     */
    private async quicksort(left: number, right: number): Promise<void> {
        if (left < right) {
            const divider = await this.divide(left, right);
            // Process left and right part simultaneously
            await Promise.all([ this.quicksort(left, divider - 1), this.quicksort(divider + 1, right) ]);
        }

        if (left === right) {
            this.data.getElement(left).setSorted();
            this.data.render();
        }
    }

    /**
     * Divides the data between index left and index right. Returning the pivot element.
     *
     * All elements with value smaller than pivot element are moved left of the pivot element.
     *
     * All elements with value bigger than pivot element are moved right of the pivot element.
     *
     * @param left The index of the left bound (inclusive)
     * @param right The index of the right bound (inclusive)
     * @return The pivot element for the given range
     * @private
     */
    private async divide(left: number, right: number): Promise<number> {
        // Variable names according to Wikipedia pseudocode.
        let i = left;
        let j = right - 1;
        const pivot = right;

        await this.visualizePivotElement(pivot);

        while (i < j) {
            await this.data.markComparingElements(i, j);

            while (i < right && this.data.compareElements(i, LESS, pivot)) {
                this.data.getElement(i).unmark();
                i++;
                await this.data.markComparingElements(i);
            }
            while (j > left && this.data.compareElements(j, GREATER_EQUAL, pivot)) {
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

        if (this.data.compareElements(i, GREATER, pivot)) {
            await this.data.swap(i, pivot);
            // Pivot is now element with index i. Mark this element as sorted
            this.data.getElement(i).setSorted();
        } else {
            this.data.getElement(pivot).unmark();
            this.data.getElement(i).setSorted();
        }

        await this.data.renderAnimated();

        return i;
    }

    private async visualizePivotElement(pivot: number): Promise<void> {
        this.data.getElement(pivot).markPivot();

        return this.data.renderAnimated();
    }
}
