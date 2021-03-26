import { Svg, SVG } from '@svgdotjs/svg.js';
import Point from '../../../domain/renderer/Point';
import Rectangle from '../../../domain/renderer/components/Rectangle';
import Line from '../../../domain/renderer/components/Line';
import Circle from '../../../domain/renderer/components/Circle';
import SVGRectangle from './SVGRectangle';
import SVGLine from './SVGLine';
import SVGCircle from './SVGCircle';
import SVGText from './SVGText';
import Text from '../../../domain/renderer/components/Text';
import SVGComponent from './SVGComponent';
import Renderer from '../../../domain/renderer/Renderer';

export default class SVGRenderer extends Renderer {
    private readonly svg: Svg;
    private readonly wrapper: HTMLDivElement;

    constructor(private readonly id: string) {
        super();
        this.wrapper = <HTMLDivElement>document.getElementById(id);
        this.svg = SVG()
            .addTo(this.wrapper)
            .size('100%',  '100%')
            .transform({
                flip: 'y',
            });
    }

    getHeight(): number {
        return this.wrapper.clientHeight;
    }

    getWidth(): number {
        return this.wrapper.clientWidth;
    }

    /**
     * Clear the whole animation area
     */
    clear(): void {
        this.svg.clear();
    }

    render(component: SVGComponent): void {
        this.svg.add(component.getElement());
    }

    // swapElementsById(elementId1: number, elementId2: number): Promise<void> {
    //     const e1 = this.svg.get(elementId1);
    //     const e2 = this.svg.get(elementId2);
    //     e1.animate({ delay: 0, duration: this.animationSpeed })
    //         .move(e2.x(), e2.y());
    //     e2.animate({ delay: 0, duration: this.animationSpeed })
    //         .move(e1.x(), e1.y());
    //
    //     return this.animate();
    // }

    createRectangle(point: Point, width: number, height: number): Rectangle {
        return new SVGRectangle(point, width, height);
    }

    createLine(a: Point, b: Point): Line {
        return new SVGLine(a, b);
    }

    createCircle(position: Point, radius: number): Circle {
        return new SVGCircle(position, radius);
    }

    createText(position: Point, text: string): Text {
        return new SVGText(text, position);
    }
}
