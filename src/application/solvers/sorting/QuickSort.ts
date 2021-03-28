import SortingProblemSolver from '../../../domain/problems/sorting/SortingProblemSolver';
import SortableData from '../../../domain/problems/sorting/SortableData';
import { GREATER, GREATER_EQUAL, LESS } from '../../../domain/problems/CompareType';

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

        await this.data.getElement(pivot).markPivot();

        while (i < j) {
            await this.data.markComparingElements(i, j);

            i = await this.findFirstElementNotSmallerThanPivotBetween(i, right, pivot);
            j = await this.findFirstElementSmallerThanPivotBetween(j, left, pivot);

            if (i < j) {
                await this.data.swap(i, j);
            } else {
                this.data.resetComparingElements(i, j);
            }
        }

        if (this.data.compareElements(i, GREATER, pivot)) {
            await this.data.swap(i, pivot);
            this.data.getElement(i).setSorted();
        } else {
            this.data.getElement(pivot).unmark();
            this.data.getElement(i).setSorted();
        }

        return i;
    }

    /**
     * Returns index of first element between right and left that is less than pivot
     *
     * @param right
     * @param left
     * @param pivot
     * @private
     */
    private async findFirstElementSmallerThanPivotBetween(right: number, left: number, pivot: number) {
        while (right > left && this.data.compareElements(right, GREATER_EQUAL, pivot)) {
            this.data.getElement(right).unmark();
            right--;
            await this.data.markComparingElements(right);
        }

        return right;
    }

    /**
     * Returns index of first element between left and right that is not smaller than pivot element
     *
     * @param left The left bound
     * @param right The right bound
     * @param pivot The value to compare to
     * @private
     */
    private async findFirstElementNotSmallerThanPivotBetween(left: number, right: number, pivot: number) {
        while (left < right && this.data.compareElements(left, LESS, pivot)) {
            this.data.getElement(left).unmark();
            left++;
            await this.data.markComparingElements(left);
        }

        return left;
    }
}
