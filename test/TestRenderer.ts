import Renderer from '../src/renderer/api/Renderer';
import Point from '../src/renderer/api/Point';
import Circle from '../src/renderer/api/components/Circle';
import Text from '../src/renderer/api/components/Text';
import Line from '../src/renderer/api/components/Line';
import Rectangle from '../src/renderer/api/components/Rectangle';
import Component from '../src/renderer/api/Component';

export class TestRenderer extends Renderer {
    animate(): Promise<void> {
        return Promise.resolve();
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    clear(): void {}

    createCircle(position: Point, radius: number): Circle {
        return {
            setBorderColor: jest.fn(),
            onMouseOver: jest.fn(),
            setColor: jest.fn(),
            onClick: jest.fn(),
            onRightClick: jest.fn(),
            setRadius: jest.fn(),
        };
    }

    createLine(a: Point, b: Point): Line {
        return {
            setBorderColor: jest.fn(),
            onMouseOver: jest.fn(),
            setColor: jest.fn(),
            onClick: jest.fn(),
            onRightClick: jest.fn(),
            setStrokeWidth: jest.fn(),
        };
    }

    createRectangle(point: Point, width: number, height: number): Rectangle {
        return {
            setBorderColor: jest.fn(),
            onMouseOver: jest.fn(),
            setColor: jest.fn(),
            onClick: jest.fn(),
            onRightClick: jest.fn(),
            setHeight: jest.fn(),
            setWidth: jest.fn(),
        };
    }

    createText(position: Point, text: string): Text {
        return {
            setBorderColor: jest.fn(),
            onMouseOver: jest.fn(),
            setColor: jest.fn(),
            onClick: jest.fn(),
            onRightClick: jest.fn(),
            setText: jest.fn(),
        };
    }

    getHeight(): number {
        return 200;
    }

    getWidth(): number {
        return 200;
    }

    render(component: Component): void {}
    setAnimationSpeed(animationSpeed: number): void {}
    swapElementsById(id1: number, id2: number): Promise<void> {
        return Promise.resolve();
    }
}
