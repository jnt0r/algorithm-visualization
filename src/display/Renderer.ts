import { SVG } from '@svgdotjs/svg.js';

export default class Renderer {
    private readonly svg = SVG('#svg-animation-frame');

    render(): void {
        console.log(this.svg);
    }
}
