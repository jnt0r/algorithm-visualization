import Component from '../../../domain/renderer/Component';
import Konva from 'konva';
import Point from '../../../domain/renderer/Point';
import AnimationSpeed from '../../../domain/renderer/AnimationSpeed';

export default class CanvasComponent implements Component {
    constructor(protected readonly shape: Konva.Shape, private readonly animationSpeed: AnimationSpeed) {
        shape.perfectDrawEnabled(false);
    }

    onClick(func: () => void): void {
        this.shape.on('click', () => func());
    }

    onMouseOver(func: (ev: { leftMouseButton: boolean; rightMouseButton: boolean }) => void): void {
        this.shape.on('mouseover', ev =>
            func({
                leftMouseButton: ev.evt.buttons === 1,
                rightMouseButton: ev.evt.buttons === 2,
            }),
        );
    }

    onRightClick(func: () => void): void {
        this.shape.on('contextmenu', () => func());
    }

    setBorderColor(hexCode: string): void {
        this.shape.stroke(hexCode);
        try {
            // Fails on first draw as layer is not set yet. So we catch it at the first call and then it works
            this.shape.draw();
        } catch (e: unknown) {}
    }

    setColor(hexCode: string): void {
        this.shape.fill(hexCode);
        try {
            // Fails on first draw as layer is not set yet. So we catch it at the first call and then it works
            this.shape.draw();
        } catch (e: unknown) {}
    }

    getShape(): Konva.Shape {
        return this.shape;
    }

    moveTo(point: Point): Promise<void> {
        this.shape.to({ x: point.getX(), y: point.getY(), duration: this.animationSpeed.getValue()/1000 });

        return new Promise<void>(resolve => {
            setTimeout(() => resolve(), this.animationSpeed.getValue());
        });
    }
}
