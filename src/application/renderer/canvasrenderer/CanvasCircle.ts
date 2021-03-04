import Circle from '../../../renderer/components/Circle';
import { CanvasComponent } from './CanvasComponent';
import Point from '../../../renderer/Point';
import Konva from 'konva';

export class CanvasCircle extends CanvasComponent implements Circle {
    constructor(position: Point, radius: number, layer: Konva.Layer) {
        super(new Konva.Circle({ x: position.getX(), y: position.getY(), radius: radius }), layer);
    }

    setRadius(radius: number): void {}
}
