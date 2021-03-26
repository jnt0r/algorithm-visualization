import CanvasComponent from './CanvasComponent';
import Text from '../../../domain/renderer/components/Text';
import Point from '../../../domain/renderer/Point';
import Konva from 'konva';
import AnimationSpeed from '../../../domain/renderer/AnimationSpeed';

export default class CanvasText extends CanvasComponent implements Text {
    constructor(position: Point, text: string, private readonly speed: AnimationSpeed) {
        super(new Konva.Text({ x: position.getX(), y: position.getY(), text: text, scaleY: -1 }), speed);
    }

    setText(text: string): void {
        (<Konva.Text>this.shape).setText(text);
    }
}
