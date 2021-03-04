import { SVG } from '@svgdotjs/svg.js';
import Point from '../../../renderer/Point';
import Rectangle from '../../../renderer/components/Rectangle';
import Line from '../../../renderer/components/Line';
import Circle from '../../../renderer/components/Circle';
import { SVGRectangle } from './SVGRectangle';
import { SVGLine } from './SVGLine';
import { SVGCircle } from './SVGCircle';
import SVGText from './SVGText';
import Text from '../../../renderer/components/Text';
import { SVGComponent } from './SVGComponent';
import BaseRenderer from '../../../renderer/BaseRenderer';

export default class SVGRenderer extends BaseRenderer {
    private readonly svg = SVG().addTo('.svg-wrapper').size('100%', '100%');

    constructor() {
        super();
        this.svg.transform({
            flip: 'y',
        });
    }

    getHeight(): number {
        return document.getElementsByClassName('svg-wrapper')[0].clientHeight;
    }

    getWidth(): number {
        return document.getElementsByClassName('svg-wrapper')[0].clientWidth;
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

    swapElementsById(elementId1: number, elementId2: number): Promise<void> {
        const e1 = this.svg.get(elementId1);
        const e2 = this.svg.get(elementId2);
        e1.animate({ delay: 0, duration: this.animationSpeed }).move(e2.x(), e2.y());
        e2.animate({ delay: 0, duration: this.animationSpeed }).move(e1.x(), e1.y());

        return this.animate();
    }

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
