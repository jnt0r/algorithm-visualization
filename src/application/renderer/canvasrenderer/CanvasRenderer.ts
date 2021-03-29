import Point from '../../../domain/renderer/Point';
import Circle from '../../../domain/renderer/components/Circle';
import Line from '../../../domain/renderer/components/Line';
import Rectangle from '../../../domain/renderer/components/Rectangle';
import Text from '../../../domain/renderer/components/Text';
import Konva from 'konva';
import CanvasCircle from './CanvasCircle';
import CanvasComponent from './CanvasComponent';
import CanvasRectangle from './CanvasRectangle';
import CanvasLine from './CanvasLine';
import CanvasText from './CanvasText';
import Renderer from '../../../domain/renderer/Renderer';

export default class CanvasRenderer extends Renderer {
    private readonly stage: Konva.Stage;
    private readonly layer: Konva.Layer;

    constructor(private readonly id: string) {
        super();
        const wrapper: HTMLDivElement = <HTMLDivElement>document.getElementById(id);
        this.stage = new Konva.Stage({
            container: wrapper,
            width: wrapper.clientWidth,
            height: wrapper.clientHeight,
            y: wrapper.clientHeight,
            scaleY: -1,
        });
        this.layer = new Konva.Layer({});
        this.stage.add(this.layer);
    }

    clear(): void {
        this.layer.removeChildren();
    }

    createCircle(position: Point, radius: number): Circle {
        return new CanvasCircle(position, radius, this.getAnimationSpeed());
    }

    createLine(a: Point, b: Point): Line {
        return new CanvasLine(a, b, this.getAnimationSpeed());
    }

    createRectangle(point: Point, width: number, height: number): Rectangle {
        return new CanvasRectangle(point, width, height, this.getAnimationSpeed());
    }

    createText(position: Point, text: string): Text {
        return new CanvasText(position, text, this.getAnimationSpeed());
    }

    getHeight(): number {
        return this.stage.height().valueOf();
    }

    getWidth(): number {
        return this.stage.width().valueOf();
    }

    render(component: CanvasComponent): void {
        this.layer.add(component.getShape());
        this.layer.batchDraw();
    }
}
