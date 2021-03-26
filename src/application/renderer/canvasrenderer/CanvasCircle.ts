import Circle from '../../../domain/renderer/components/Circle';
import CanvasComponent from './CanvasComponent';
import Point from '../../../domain/renderer/Point';
import Konva from 'konva';
import AnimationSpeed from '../../../domain/renderer/AnimationSpeed';

export default class CanvasCircle extends CanvasComponent implements Circle {
    constructor(private readonly position: Point, radius: number, private readonly speed: AnimationSpeed) {
        super(new Konva.Circle({ x: position.getX(), y: position.getY(), radius: radius }), speed);
    }

    setRadius(radius: number): void {
        (<Konva.Circle>this.shape).radius(radius);
    }
}
