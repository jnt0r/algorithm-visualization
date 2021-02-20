import { SVGComponent } from './SVGComponent';
import Line from '../../../renderer/components/Line';
import Point from '../../../renderer/Point';
import { Line as SvgLine } from '@svgdotjs/svg.js';

export class SVGLine extends SVGComponent implements Line {
    constructor(a: Point, b: Point) {
        super(new SvgLine().plot(a.getX(), a.getY(), b.getX(), b.getY()).stroke('#000'));
    }

    setStrokeWidth(width: number): void {
        this.element.stroke({ width: width });
    }
}
