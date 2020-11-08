import Component from '../Component';
import Point from '../Point';
import { Line as SVGLine } from '@svgdotjs/svg.js';

export default class Line extends Component {
    constructor(private readonly a: Point, private readonly b: Point) {
        super(new SVGLine().plot(a.x, a.y, b.x, b.y));
    }
}
