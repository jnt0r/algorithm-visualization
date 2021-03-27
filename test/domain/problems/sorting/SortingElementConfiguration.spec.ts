import SortingElementConfiguration from '../../../../src/domain/problems/sorting/SortingElementConfiguration';
import Point from '../../../../src/domain/renderer/Point';

describe('SortingElementConfiguration', () => {
    it('config for 2 elements on width of 100', () => {
        const config = new SortingElementConfiguration(100, 200, 2);

        expect(config.getWidth()).toBe(2);
        expect(config.getPointForIndex(0)).toEqual(new Point(43, 100));
        expect(config.getPointForIndex(1)).toEqual(new Point(50, 100));
    });

    it('config for 20 elements on width of 800', () => {
        const config = new SortingElementConfiguration(800, 600, 20);

        expect(config.getWidth()).toBe(16);
        expect(config.getPointForIndex(0)).toEqual(new Point(190, 100));
        expect(config.getPointForIndex(1)).toEqual(new Point(211, 100));
        expect(config.getPointForIndex(19)).toEqual(new Point(589, 100));
        expect(config.getPointForIndex(20)).toEqual(new Point(610, 100));
    });
});
