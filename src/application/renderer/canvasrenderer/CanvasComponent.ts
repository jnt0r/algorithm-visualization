import Component from '../../../renderer/Component';
import Konva from 'konva';

export class CanvasComponent implements Component {
    constructor(protected readonly shape: Konva.Shape, private layer: Konva.Layer) {
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
}
