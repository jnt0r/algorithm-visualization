import { SVGComponent } from './SVGComponent';
import Rectangle from '../../renderer/components/Rectangle';
import Point from '../../renderer/Point';
import { Rect } from '@svgdotjs/svg.js';

export class SVGRectangle extends SVGComponent implements Rectangle {
    constructor(position: Point, width: number, height: number) {
        super(new Rect().move(position.getX(), position.getY()).size(width, height));
    }

    setHeight(height: number): void {
        this.element.size(this.element.width(), height);
    }

    setWidth(width: number): void {
        this.element.size(width);
    }
}
