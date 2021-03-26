import SortingElement from '../../../../src/domain/problems/sorting/SortingElement';
import Renderer from '../../../../src/domain/renderer/Renderer';
import { anyNumber, anyOfClass, anyString, deepEqual, instance, mock, resetCalls, verify, when } from 'ts-mockito';
import Rectangle from '../../../../src/domain/renderer/components/Rectangle';
import Point from '../../../../src/domain/renderer/Point';

describe('SortingElement', () => {
    const mockRenderer: Renderer = mock<Renderer>();
    const renderer: Renderer = instance(mockRenderer);
    const mockRectangle: Rectangle = mock<Rectangle>();
    const rectangle: Rectangle = instance(mockRectangle);
    let element: SortingElement;

    beforeEach(() => {
        when(mockRenderer.getWidth()).thenReturn(800);
        when(mockRenderer.createRectangle(anyOfClass(Point), anyNumber(), anyNumber())).thenReturn(rectangle);
        element = new SortingElement(5, 2, renderer);
        resetCalls(mockRectangle);
    });

    it('should create rectangle', () => {
        const point = new Point(190 + 2 * (16+5),100);
        const width = 16;
        const height = 5;

        verify(mockRenderer.createRectangle(deepEqual(point), width, height)).once();
    });

    describe('setIndex', () => {
        it('should call moveTo with new point on component', () => {
            element.setIndex(1);

            const newPoint = new Point(190 + 1 * (16 + 5), 100);

            verify(mockRectangle.moveTo(deepEqual(newPoint))).once();
        });
    });

    it('setSorted should mark element as sorted', () => {
        element.setSorted();

        expect(element.isSorted()).toBeTruthy();
        verify(mockRectangle.setColor('#13CE66')).once();
        verify(mockRectangle.setBorderColor('#13CE66')).once();
    });

    it('unmark should reset element if is not sorted', () => {
        element.unmark();

        verify(mockRectangle.setColor('#58B7FF')).once();
        verify(mockRectangle.setBorderColor('#58B7FF')).once();
    });

    it('unmark should do nothing if element if is sorted', () => {
        element.setSorted();
        resetCalls(mockRectangle);
        element.unmark();

        verify(mockRectangle.setColor(anyString())).never();
        verify(mockRectangle.setBorderColor(anyString())).never();
    });

    it('markComparing should change color', () => {
        element.markComparing();

        verify(mockRectangle.setColor('#FF4949')).once();
        verify(mockRectangle.setBorderColor('#FF4949')).once();
    });

    it('markPivot should change color', () => {
        element.markPivot();

        verify(mockRectangle.setColor('#7f00ff')).once();
        verify(mockRectangle.setBorderColor('#7f00ff')).once();
    });
});
