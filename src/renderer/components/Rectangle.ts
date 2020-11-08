import Component from '../Component';
import { Rect } from '@svgdotjs/svg.js';

export default class Rectangle extends Component {
    constructor(
        private readonly x: number,
        private readonly y: number,
        private readonly width: number,
        private readonly height: number,
    ) {
        super(new Rect().move(x, y).size(width, height));
    }
}
