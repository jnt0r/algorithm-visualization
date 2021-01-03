import SortableData from './src/problems/sorting/SortableData';
import { TestRenderer } from './test/TestRenderer';
import CustomMatcherResult = jest.CustomMatcherResult;

const renderer = new TestRenderer();
const sortedData = new SortableData([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], renderer);
expect.extend({
    toBeSorted(received: SortableData): CustomMatcherResult {
        if (sortedData.getSize() != received.getSize())
            return {
                pass: false,
                message: () => `Expected to have ${sortedData.getSize()} elements`,
            };

        for (let i = 0; i < sortedData.getSize(); i++) {
            if (received.getElement(i).getValue() != sortedData.getElement(i).getValue()) {
                return {
                    pass: false,
                    message: () =>
                        `Expected element ${i} to be ${sortedData
                            .getElement(i)
                            .getValue()} but was ${received.getElement(i).getValue()}`,
                };
            }
        }

        return {
            pass: true,
            message: () => 'Expected ${received} not to be a valid ISO date string',
        };
    },
});
