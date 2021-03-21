import CanvasComponent from './CanvasComponent';
import Text from '../../api/components/Text';
import Point from '../../api/Point';
import Konva from 'konva';

export default class CanvasText extends CanvasComponent implements Text {
    constructor(position: Point, text: string, layer: Konva.Layer) {
        super(new Konva.Text({ x: position.getX(), y: position.getY(), text: text, scaleY: -1 }), layer);
    }

    setText(text: string): void {
        (<Konva.Text>this.shape).setText(text);
    }
}
