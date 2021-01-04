import Component from '../../renderer/Component';
import { Element } from '@svgdotjs/svg.js';

export class SVGComponent implements Component {
    protected element: Element;

    protected constructor(element: Element) {
        this.element = element;
    }

    getElement(): Element {
        return this.element;
    }

    setColor(hexCode: string): void {
        this.element.attr({ fill: hexCode });
    }

    setBorderColor(hexCode: string): void {
        this.element.stroke(hexCode);
    }

    onClick(func: () => void): void {
        this.element.click(func);
    }

    onRightClick(func: () => void): void {
        this.element.on('contextmenu', (ev: Event) => {
            ev.preventDefault(); // prevent contextmenu to open
            func();
        });
    }

    onMouseOver(func: (ev: { buttons: number }) => void): void {
        this.element.on('mouseover mousedown', (e: MouseEvent) => {
            e.preventDefault();
            func(e);
        });
    }
}
