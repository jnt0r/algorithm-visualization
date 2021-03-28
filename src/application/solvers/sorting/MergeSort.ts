import SortingProblemSolver from '../../../domain/problems/sorting/SortingProblemSolver';
import SortableData from '../../../domain/problems/sorting/SortableData';
import { LESS_EQUAL } from '../../../domain/problems/CompareType';

export default class MergeSort implements SortingProblemSolver {
    async solve(data: SortableData): Promise<void> {
        return this.mergeSort(data, 0, data.getSize() - 1)
            .then(() => this.markAllElementsAsSolved(data));
    }

    private markAllElementsAsSolved(data: SortableData) {
        for (let i = 0; i < data.getSize(); i++) {
            data.getElement(i).setSorted();
        }
    }

    /**
     * Sorts given data from index left to index right (inclusive)
     * @param data
     * @param left The left index (inclusive)
     * @param right The right index (inclusive)
     * @private
     */
    private async mergeSort(data: SortableData, left: number, right: number): Promise<void> {
        if (right === left) {
            return Promise.resolve();
        }

        const middleIndex = this.calculateMiddleBetween(left, right);
        await Promise.all([
            this.mergeSort(data, left, middleIndex),
            this.mergeSort(data, middleIndex+1, right)
        ]);

        return this.merge(data, left, middleIndex, right);
    }

    private calculateMiddleBetween(left: number, right: number) {
        return Math.floor(right - ((right - left) / 2));
    }

    /**
     * Merges both sorted parts of the data.
     * First part between left and middle (both inclusive).
     * Second part between middle and right (right inclusive).
     *
     * @param data
     * @param left The left index (inclusive)
     * @param middle The middle index. Included in left part. Excluded in right part.
     * @param right The right index (inclusive)
     * @private
     */
    private async merge(data: SortableData, left: number, middle: number, right: number) {
        let i = left;
        let j = middle + 1;

        while (i <= middle && j <= right) {
            await data.markComparingElements(i, j);

            if (data.compareElements(i, LESS_EQUAL, j)) {
                await data.resetComparingElements(i, j);
                i++;
            } else {
                for (let c = j; c > i; c--) {
                    await data.swap(c-1, c);
                }
                await data.resetComparingElements(i, j);
                j++;
                i++;
                middle++;
            }
        }
    }
}
