import SortableData from './src/problems/sorting/SortableData';
import Renderer from './src/renderer/Renderer';
import Point from './src/renderer/Point';
import Circle from './src/renderer/components/Circle';
import { SVGCircle } from './src/application/svgrenderer/SVGCircle';
import Line from './src/renderer/components/Line';
import { SVGLine } from './src/application/svgrenderer/SVGLine';
import Rectangle from './src/renderer/components/Rectangle';
import { SVGRectangle } from './src/application/svgrenderer/SVGRectangle';
import Component from './src/renderer/Component';
import CustomMatcherResult = jest.CustomMatcherResult;

const renderer: Renderer = {
    animate(): Promise<void> {
        return Promise.resolve();
    },
    clear(): void {},
    createCircle(position: Point, radius: number): Circle {
        return new SVGCircle(position, radius);
    },
    createLine(a: Point, b: Point): Line {
        return new SVGLine(a, b);
    },
    createRectangle(point: Point, width: number, height: number): Rectangle {
        return new SVGRectangle(point, width, height);
    },
    getHeight(): number {
        return 0;
    },
    getWidth(): number {
        return 0;
    },
    render(component: Component): void {},
    setAnimationSpeed(animationSpeed: number): void {},
    swapElementsById(id1: number, id2: number): Promise<void> {
        return Promise.resolve();
    },
};
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
