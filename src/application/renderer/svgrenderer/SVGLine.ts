import SVGComponent from './SVGComponent';
import Line from '../../../domain/renderer/components/Line';
import Point from '../../../domain/renderer/Point';
import { Line as SvgLine } from '@svgdotjs/svg.js';
import AnimationSpeed from '../../../domain/renderer/AnimationSpeed';

export default class SVGLine extends SVGComponent implements Line {
    constructor(a: Point, b: Point, private readonly speed: AnimationSpeed) {
        super(new SvgLine().plot(a.getX(), a.getY(), b.getX(), b.getY())
            .stroke('#000'), speed);
    }

    setStrokeWidth(width: number): void {
        this.element.stroke({ width: width });
    }
}
