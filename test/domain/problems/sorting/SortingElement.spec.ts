import SortingElement from '../../../../src/domain/problems/sorting/SortingElement';
import Renderer from '../../../../src/domain/renderer/Renderer';
import { anyNumber, anyOfClass, anyString, deepEqual, instance, mock, resetCalls, verify, when } from 'ts-mockito';
import Rectangle from '../../../../src/domain/renderer/components/Rectangle';
import Point from '../../../../src/domain/renderer/Point';
import SortingElementConfiguration from '../../../../src/domain/problems/sorting/SortingElementConfiguration';

describe('SortingElement', () => {
    const mockRenderer: Renderer = mock<Renderer>();
    const renderer: Renderer = instance(mockRenderer);

    const mockRectangle: Rectangle = mock<Rectangle>();
    const rectangle: Rectangle = instance(mockRectangle);

    const mockConfiguration: SortingElementConfiguration = mock(SortingElementConfiguration);
    const configuration: SortingElementConfiguration = instance(mockConfiguration);

    const width = 20;
    const pointForIndex2 = new Point(0,0);
    const pointForIndex1 = new Point(0,0);

    let element: SortingElement;

    beforeEach(() => {
        when(mockConfiguration.getWidth()).thenReturn(width);
        when(mockConfiguration.getPointForIndex(2)).thenReturn(pointForIndex2);
        when(mockConfiguration.getPointForIndex(1)).thenReturn(pointForIndex1);

        when(mockRenderer.createRectangle(anyOfClass(Point), anyNumber(), anyNumber())).thenReturn(rectangle);
        element = new SortingElement(5, 2, configuration, renderer);
        resetCalls(mockRectangle);
    });

    it('should create rectangle', () => {
        verify(mockRenderer.createRectangle(deepEqual(pointForIndex2), width, 5)).once();
    });

    describe('setIndex', () => {
        it('should call moveTo with new point on component', () => {
            element.setIndex(1);

            verify(mockRectangle.moveTo(deepEqual(pointForIndex1))).once();
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
