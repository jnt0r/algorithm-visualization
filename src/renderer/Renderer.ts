import { SVG } from '@svgdotjs/svg.js';
import Renderable from './Renderable';

const animationSpeed = 300;

export default class Renderer {
    private readonly svg = SVG('#svg-animation-frame');

    constructor() {
        this.svg.transform({ flip: 'y' });
    }

    /**
     * Clear the whole animation area
     */
    clear(): void {
        this.svg.clear();
    }

    render(renderable: Renderable): void {
        renderable.getElement().addTo(this.svg);
    }

    async swapElementsById(elementId1: number, elementId2: number): Promise<void> {
        return this.animate(() => {
            const e1 = this.svg.get(elementId1);
            const e2 = this.svg.get(elementId2);
            e1.animate({ delay: 0, duration: animationSpeed }).move(e2.x(), e2.y());
            e2.animate({ delay: 0, duration: animationSpeed }).move(e1.x(), e1.y());
        });
    }

    async animate(func: () => void): Promise<void> {
        return new Promise((resolve) => {
            func();

            // Wait for the transition to end!
            window.requestAnimationFrame(function () {
                setTimeout(() => {
                    resolve();
                }, animationSpeed);
            });
        });
    }
}
