import Component from '../Component';
import { Circle as SVGCircle } from '@svgdotjs/svg.js';
import Point from '../Point';

export default class Circle extends Component {
    constructor(private readonly point: Point, private readonly r: number) {
        super(new SVGCircle().move(point.getX(), point.getY()).radius(r));
    }
}
