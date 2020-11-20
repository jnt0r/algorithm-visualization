import Component from '../Component';
import { Rect } from '@svgdotjs/svg.js';
import Point from '../Point';

export default class Rectangle extends Component {
    constructor(private readonly point: Point, private readonly width: number, private readonly height: number) {
        super(new Rect().move(point.getX(), point.getY()).size(width, height));
    }
}
