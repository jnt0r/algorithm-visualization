import Point from '../../../renderer/Point';
import Circle from '../../../renderer/components/Circle';
import Line from '../../../renderer/components/Line';
import Rectangle from '../../../renderer/components/Rectangle';
import Text from '../../../renderer/components/Text';
import Konva from 'konva';
import { CanvasCircle } from './CanvasCircle';
import { CanvasComponent } from './CanvasComponent';
import { CanvasRectangle } from './CanvasRectangle';
import { CanvasLine } from './CanvasLine';
import { CanvasText } from './CanvasText';
import BaseRenderer from '../../../renderer/BaseRenderer';

export default class CanvasRenderer extends BaseRenderer {
    private readonly stage: Konva.Stage;
    private readonly layer: Konva.Layer;

    constructor() {
        super();
        const wrapper: HTMLDivElement = <HTMLDivElement>document.getElementById('canvas-wrapper');
        this.stage = new Konva.Stage({
            container: 'canvas-wrapper',
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
        return new CanvasCircle(position, radius, this.layer);
    }

    createLine(a: Point, b: Point): Line {
        return new CanvasLine(a, b, this.layer);
    }

    createRectangle(point: Point, width: number, height: number): Rectangle {
        return new CanvasRectangle(point, width, height, this.layer);
    }

    createText(position: Point, text: string): Text {
        return new CanvasText(position, text, this.layer);
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

    swapElementsById(id1: number, id2: number): Promise<void> {
        const a = this.stage.find('Rect')[id1];
        const b = this.stage.find('Rect')[id2];

        const a_goal = b.x();
        const b_goal = a.x();

        a.to({ x: a_goal, duration: this.animationSpeed / 1000 });
        b.to({ x: b_goal, duration: this.animationSpeed / 1000 });

        return this.animate();
    }
}
