import CanvasComponent from './CanvasComponent';
import Line from '../../../domain/renderer/components/Line';
import Point from '../../../domain/renderer/Point';
import Konva from 'konva';
import AnimationSpeed from '../../../domain/renderer/AnimationSpeed';

export default class CanvasLine extends CanvasComponent implements Line {
    constructor(a: Point, b: Point, private readonly speed: AnimationSpeed) {
        super(new Konva.Line({ points: [ a.getX(), a.getY(), b.getX(), b.getY() ], strokeWidth: 1 }), speed);
    }

    setStrokeWidth(width: number): void {
        this.shape.strokeWidth(width);
    }
}
