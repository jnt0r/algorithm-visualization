import { Element } from '@svgdotjs/svg.js';

export default interface Renderable {
    getElement(): Element;
}
