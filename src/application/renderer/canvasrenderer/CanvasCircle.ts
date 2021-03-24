import Circle from '../../../domain/renderer/components/Circle';
import CanvasComponent from './CanvasComponent';
import Point from '../../../domain/renderer/Point';
import Konva from 'konva';

export default class CanvasCircle extends CanvasComponent implements Circle {
    constructor(position: Point, radius: number, layer: Konva.Layer) {
        super(new Konva.Circle({ x: position.getX(), y: position.getY(), radius: radius }), layer);
    }

    setRadius(radius: number): void {
        (<Konva.Circle>this.shape).radius(radius);
    }
}
