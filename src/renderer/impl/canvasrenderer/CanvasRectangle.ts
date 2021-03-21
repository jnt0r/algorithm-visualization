import CanvasComponent from './CanvasComponent';
import Rectangle from '../../api/components/Rectangle';
import Point from '../../api/Point';
import Konva from 'konva';

export default class CanvasRectangle extends CanvasComponent implements Rectangle {
    constructor(point: Point, width: number, height: number, layer: Konva.Layer) {
        super(
            new Konva.Rect({
                x: point.getX(),
                y: point.getY(),
                width: width,
                height: height,
                stroke: 'black',
                fill: 'red',
            }),
            layer,
        );
    }

    setHeight(height: number): void {
        this.getShape().height(height);
    }

    setWidth(width: number): void {
        this.getShape().width(width);
    }
}
