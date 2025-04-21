import Renderer from '../src/domain/renderer/Renderer';
import Point from '../src/domain/renderer/Point';
import Circle from '../src/domain/renderer/components/Circle';
import Line from '../src/domain/renderer/components/Line';
import Rectangle from '../src/domain/renderer/components/Rectangle';
import Text from '../src/domain/renderer/components/Text';
import Component from '../src/domain/renderer/Component';

export class TestRenderer extends Renderer {
    animate(): Promise<void> {
        return Promise.resolve();
    }


    clear(): void {}

    createCircle(position: Point, radius: number): Circle {
        return {
            setBorderColor: jest.fn(),
            onMouseOver: jest.fn(),
            setColor: jest.fn(),
            onClick: jest.fn(),
            onRightClick: jest.fn(),
            setRadius: jest.fn(),
            moveTo: jest.fn(),
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
            moveTo: jest.fn(),
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
            moveTo: jest.fn(),
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
            moveTo: jest.fn(),
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
}
