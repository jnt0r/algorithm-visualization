import SVGComponent from './SVGComponent';
import Circle from '../../api/components/Circle';
import Point from '../../api/Point';
import { Circle as SvgCircle } from '@svgdotjs/svg.js';

export default class SVGCircle extends SVGComponent implements Circle {
    constructor(position: Point, radius: number) {
        super(new SvgCircle().move(position.getX(), position.getY())
            .radius(radius));
    }

    setRadius(radius: number): void {
        (<SvgCircle>this.element).radius(radius);
    }
}
