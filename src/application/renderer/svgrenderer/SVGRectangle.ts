import SVGComponent from './SVGComponent';
import Rectangle from '../../../domain/renderer/components/Rectangle';
import Point from '../../../domain/renderer/Point';
import { Rect } from '@svgdotjs/svg.js';
import AnimationSpeed from '../../../domain/renderer/AnimationSpeed';

export default class SVGRectangle extends SVGComponent implements Rectangle {
    constructor(position: Point, width: number, height: number, private readonly speed: AnimationSpeed) {
        super(new Rect().move(position.getX(), position.getY())
            .size(width, height), speed);
    }

    setHeight(height: number): void {
        this.element.size(this.element.width(), height);
    }

    setWidth(width: number): void {
        this.element.size(width);
    }
}
