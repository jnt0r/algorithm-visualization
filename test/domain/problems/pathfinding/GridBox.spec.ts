import GridBox from '../../../../src/domain/problems/pathfinding/GridBox';
import Renderer from '../../../../src/domain/renderer/Renderer';
import Point from '../../../../src/domain/renderer/Point';
import { anyNumber, anyOfClass, anyString, instance, mock, resetCalls, verify, when } from 'ts-mockito';
import Rectangle from '../../../../src/domain/renderer/components/Rectangle';

describe('GridBox', () => {
    const mockRenderer: Renderer = mock<Renderer>();
    const renderer: Renderer = instance(mockRenderer);
    const mockRectangle: Rectangle = mock<Rectangle>();
    const rectangle: Rectangle = instance(mockRectangle);
    let box: GridBox;

    beforeEach(() => {
        when(mockRenderer.createRectangle(anyOfClass(Point), anyNumber(), anyNumber())).thenReturn(rectangle);
        box = new GridBox(new Point(0,0), renderer);
        resetCalls(mockRectangle);
    });

    describe('default element', () => {
        it('should not be visited and no wall and should have maximum cost', () => {
            expect(box.getCost()).toBe(Number.MAX_VALUE);
            expect(box.isVisited()).toBeFalsy();
            expect(box.isWall()).toBeFalsy();
        });

        it('markVisited should mark box as visited', () => {
            box.markVisited();

            expectToBeVisitedElement(box);
            verify(mockRectangle.setColor('#FF0')).once();
            verify(mockRectangle.setBorderColor('#000')).once();
        });

        it('setWall should make element to wall', () => {
            box.setWall();

            expectToBeWallElement(box);
            verify(mockRectangle.setColor('#000')).atLeast(1);
            verify(mockRectangle.setBorderColor('#000')).atLeast(1);
        });

        it('removeWall should do nothing', () => {
            box.removeWall();

            expectToBeNormalElement(box);
        });

        it('markStart should mark element as start', () => {
            box.markStart();

            expectToBeNormalElement(box);
        });

        it('markGoal should mark element as goal', () => {
            box.markGoal();

            expectToBeNormalElement(box);
            verify(mockRectangle.setColor('#0F0')).once();
            verify(mockRectangle.setBorderColor('#000')).once();
        });

        it('markPartOfPath', () => {
            box.markPartOfPath();

            expectToBeNormalElement(box);
            verify(mockRectangle.setColor('#04d9ff')).once();
            verify(mockRectangle.setBorderColor('#000')).once();
        });

        it('reset should reset element', () => {
            box.setCost(0); // Setting cost to 0 to check if it is reset

            box.reset();

            expectToBeNormalElement(box);
            verify(mockRectangle.setColor('#FFF')).atLeast(1);
            verify(mockRectangle.setBorderColor('#000')).atLeast(1);
        });
    });

    describe('visited element', () => {
        beforeEach(()=>{
            box.markVisited();
            resetCalls(mockRectangle);
        });

        it('setWall should make element to wall', () => {
            box.setWall();

            expectToBeWallElement(box);
        });
    });

    describe('wall element', () => {
        beforeEach(() => {
            box.setWall();
            resetCalls(mockRectangle);
        });

        it('removeWall should make element to default element', () => {
            box.removeWall();

            expectToBeNormalElement(box);
        });

        it('reset should do nothing', () => {
            box.reset();

            expectToBeWallElement(box);
        });
    });

    describe('start element', () => {
        beforeEach(() => {
            box.markStart();
            resetCalls(mockRectangle);
        });

        it('setWall should do nothing', () => {
            box.setWall();

            expectToBeNormalElement(box);
            verify(mockRectangle.setColor(anyString())).never();
            verify(mockRectangle.setBorderColor(anyString())).never();
        });

        it('removeWall should do nothing', () => {
            box.removeWall();

            expectToBeNormalElement(box);
            verify(mockRectangle.setColor(anyString())).never();
            verify(mockRectangle.setBorderColor(anyString())).never();
        });

        it('markVisited should not update color', () => {
            box.markVisited();

            expectToBeVisitedElement(box);
            verify(mockRectangle.setColor(anyString())).never();
            verify(mockRectangle.setBorderColor(anyString())).never();
        });

        it('reset should not update color', () => {
            box.reset();

            expectToBeNormalElement(box);
            verify(mockRectangle.setColor(anyString())).never();
            verify(mockRectangle.setBorderColor(anyString())).never();
        });
    });

    describe('goal element', () => {
        beforeEach(() => {
            box.markGoal();
            resetCalls(mockRectangle);
        });

        it('setWall should do nothing', () => {
            box.setWall();

            expectToBeNormalElement(box);
            verify(mockRectangle.setColor(anyString())).never();
            verify(mockRectangle.setBorderColor(anyString())).never();
        });

        it('removeWall should do nothing', () => {
            box.removeWall();

            expectToBeNormalElement(box);
            verify(mockRectangle.setColor(anyString())).never();
            verify(mockRectangle.setBorderColor(anyString())).never();
        });

        it('markVisited should not update color', () => {
            box.markVisited();

            expectToBeVisitedElement(box);
            verify(mockRectangle.setColor(anyString())).never();
            verify(mockRectangle.setBorderColor(anyString())).never();
        });

        it('reset should not update color', () => {
            box.reset();

            expectToBeNormalElement(box);
            verify(mockRectangle.setColor(anyString())).never();
            verify(mockRectangle.setBorderColor(anyString())).never();
        });
    });
});

function expectToBeWallElement(box: GridBox) {
    expect(box.getCost()).toBe(Number.MAX_VALUE);
    expect(box.isWall()).toBeTruthy();
    expect(box.isVisited()).toBeTruthy();
    // verify(mockRectangle.setColor('#000')).atLeast(1);
    // verify(mockRectangle.setBorderColor('#000')).atLeast(1);
}

function expectToBeNormalElement(box: GridBox) {
    expect(box.getCost()).toBe(Number.MAX_VALUE);
    expect(box.isWall()).toBeFalsy();
    expect(box.isVisited()).toBeFalsy();
    // verify(mockRectangle.setColor('#FFF')).atLeast(1);
    // verify(mockRectangle.setBorderColor('#000')).atLeast(1);
}

function expectToBeVisitedElement(box: GridBox) {
    expect(box.getCost()).toBe(Number.MAX_VALUE);
    expect(box.isWall()).toBeFalsy();
    expect(box.isVisited()).toBeTruthy();
}
