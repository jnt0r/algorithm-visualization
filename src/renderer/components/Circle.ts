import Component from '../Component';
import { Circle as SVGCircle } from '@svgdotjs/svg.js';

export default class Circle extends Component {
    constructor(private readonly x: number, private readonly y: number, private readonly r: number) {
        super(new SVGCircle().move(x, y).radius(r));
    }
}
