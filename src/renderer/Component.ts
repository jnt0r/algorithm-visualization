import Renderable from './Renderable';
import { Element } from '@svgdotjs/svg.js';

export default interface Component {
    // protected element: Element;
    //
    // constructor(element: Element) {
    //     this.element = element;
    // }
    //
    // getElement(): Element {
    //     return this.element;
    // }
    //
    setColor(hexCode: string): void;

    setBorderColor(hexCode: string): void;

    onClick(func: () => void): void;

    onRightClick(func: () => void): void;

    onMouseOver(func: (ev: { buttons: number }) => void): void;
}
