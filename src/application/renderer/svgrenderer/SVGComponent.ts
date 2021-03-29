import Component from '../../../domain/renderer/Component';
import { Element } from '@svgdotjs/svg.js';
import Point from '../../../domain/renderer/Point';
import AnimationSpeed from '../../../domain/renderer/AnimationSpeed';

export default class SVGComponent implements Component {

    protected constructor(protected readonly element: Element, private readonly animationSpeed: AnimationSpeed) {}

    getElement(): Element {
        return this.element;
    }

    setColor(hexCode: string): void {
        this.element.attr({ fill: hexCode });
    }

    setBorderColor(hexCode: string): void {
        this.element.stroke({ color: hexCode });
    }

    onClick(func: () => void): void {
        this.element.click(func);
    }

    onRightClick(func: () => void): void {
        this.element.on('contextmenu', (ev: Event) => {
            ev.preventDefault();
            func();
        });
    }

    onMouseOver(func: (ev: { leftMouseButton: boolean; rightMouseButton: boolean }) => void): void {
        this.element.on('mouseover mousedown', (e: MouseEvent) => {
            e.preventDefault();
            func({ leftMouseButton: e.buttons === 1, rightMouseButton: e.buttons === 2 });
        });
    }

    moveTo(point: Point): Promise<void> {
        this.element.animate({ delay: 0, duration: this.animationSpeed.getValue() })
            .move(point.getX(), point.getY());

        return new Promise<void>(resolve => {
            setTimeout(() => resolve(), this.animationSpeed.getValue());
        });
    }
}
