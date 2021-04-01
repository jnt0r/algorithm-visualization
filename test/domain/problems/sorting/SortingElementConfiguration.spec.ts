import SortingElementConfiguration from '../../../../src/domain/problems/sorting/SortingElementConfiguration';
import Point from '../../../../src/domain/renderer/Point';

describe('SortingElementConfiguration', () => {
    it('config for 2 elements on 100x200', () => {
        const config = new SortingElementConfiguration(100, 200, 2);

        expect(config.getWidth()).toBe(2);
        expect(config.getPointForIndex(0)).toEqual(new Point(43, 20));
        expect(config.getPointForIndex(1)).toEqual(new Point(50, 20));
    });

    it('config for 20 elements on 800x600', () => {
        const config = new SortingElementConfiguration(800, 600, 20);

        expect(config.getWidth()).toBe(16);
        expect(config.getPointForIndex(0)).toEqual(new Point(190, 60));
        expect(config.getPointForIndex(1)).toEqual(new Point(211, 60));
        expect(config.getPointForIndex(19)).toEqual(new Point(589, 60));
        expect(config.getPointForIndex(20)).toEqual(new Point(610, 60));
    });
});
