import Renderer from '../src/renderer/Renderer';
import Point from '../src/renderer/Point';
import Circle from '../src/renderer/components/Circle';
import { SVGCircle } from '../src/application/svgrenderer/SVGCircle';
import Line from '../src/renderer/components/Line';
import { SVGLine } from '../src/application/svgrenderer/SVGLine';
import Rectangle from '../src/renderer/components/Rectangle';
import { SVGRectangle } from '../src/application/svgrenderer/SVGRectangle';
import Component from '../src/renderer/Component';

export class TestRenderer implements Renderer {
    animate(): Promise<void> {
        return Promise.resolve();
    }

    clear(): void {}
    createCircle(position: Point, radius: number): Circle {
        return new SVGCircle(position, radius);
    }

    createLine(a: Point, b: Point): Line {
        return new SVGLine(a, b);
    }

    createRectangle(point: Point, width: number, height: number): Rectangle {
        return new SVGRectangle(point, width, height);
    }

    getHeight(): number {
        return 0;
    }

    getWidth(): number {
        return 0;
    }

    render(component: Component): void {}
    setAnimationSpeed(animationSpeed: number): void {}
    swapElementsById(id1: number, id2: number): Promise<void> {
        return Promise.resolve();
    }
}
