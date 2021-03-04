import { CanvasComponent } from './CanvasComponent';
import Line from '../../../renderer/components/Line';
import Point from '../../../renderer/Point';
import Konva from 'konva';

export class CanvasLine extends CanvasComponent implements Line {
    constructor(a: Point, b: Point, layer: Konva.Layer) {
        super(new Konva.Line({ points: [a.getX(), a.getY(), b.getX(), b.getY()], strokeWidth: 1 }), layer);
    }

    setStrokeWidth(width: number): void {}
}
