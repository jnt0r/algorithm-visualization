import { SVGComponent } from './SVGComponent';
import Circle from '../../renderer/components/Circle';
import Point from '../../renderer/Point';
import { Circle as SvgCircle } from '@svgdotjs/svg.js';

export class SVGCircle extends SVGComponent implements Circle {
    constructor(position: Point, radius: number) {
        super(new SvgCircle().move(position.getX(), position.getY()).radius(radius));
    }

    setRadius(radius: number): void {
        (<SvgCircle>this.element).radius(radius);
    }
}
