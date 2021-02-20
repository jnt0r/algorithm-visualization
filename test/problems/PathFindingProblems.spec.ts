import Grid from '../../src/problems/pathfinding/Grid';
import { TestRenderer } from '../TestRenderer';
import Renderer from '../../src/renderer/Renderer';

describe('stats', () => {
    const renderer: Renderer = new TestRenderer();

    test('Visited fields should be initialized with 0', () => {
        const data = new Grid(10, 10, renderer);
        expect(data.getStats().getStats().get('Visited fields')).toEqual(0);
    });

    test('Visited fields should increase by 1 on getElement', () => {
        const data = new Grid(10, 10, renderer);
        data.getElement(1, 1);
        expect(data.getStats().getStats().get('Visited fields')).toEqual(1);
    });

    test('Path fields should be initialized with 0', () => {
        const data = new Grid(10, 10, renderer);
        expect(data.getStats().getStats().get('Path fields')).toEqual(0);
    });

    test('Path fields should increase by 1 per Path field', () => {
        const data = new Grid(10, 10, renderer);
        expect(data.getStats().getStats().get('Path fields')).toEqual(0);
    });
});
