import Renderable from './Renderable';
import { Element } from '@svgdotjs/svg.js';

export default class Component implements Renderable {
    protected element: Element;

    constructor(element: Element) {
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
}
