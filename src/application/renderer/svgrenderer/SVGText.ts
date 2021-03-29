import Text from '../../../domain/renderer/components/Text';
import SVGComponent from './SVGComponent';
import { Text as SvgText } from '@svgdotjs/svg.js';
import Point from '../../../domain/renderer/Point';
import AnimationSpeed from '../../../domain/renderer/AnimationSpeed';

export default class SVGText extends SVGComponent implements Text {
    constructor(private text: string, private readonly position: Point, private readonly speed: AnimationSpeed) {
        super(new SvgText().text(text)
            .transform({ scaleY: -1 })
            .move(position.getX(), position.getY()), speed);
    }

    setText(text: string): void {
        this.element.setData({ text });
    }
}
