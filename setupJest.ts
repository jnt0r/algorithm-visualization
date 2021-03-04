import SortableData from './src/problems/sorting/SortableData';

expect.extend({
    toBeSorted(received: SortableData) {
        let lastValue = received.getElement(0).getValue();

        for (let i = 1; i < received.getSize(); i++) {
            if (received.getElement(i).getValue() < lastValue) {
                return {
                    pass: false,
                    message: () =>
                        `Expected element ${i} to be greater than ${lastValue} but was ${received
                            .getElement(i)
                            .getValue()}`,
                };
            }
            lastValue = received.getElement(i).getValue();
        }

        return {
            pass: true,
            message: () => 'SortableData elements are sorted correctly',
        };
    },
});
