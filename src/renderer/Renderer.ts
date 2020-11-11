import { Rect, SVG } from '@svgdotjs/svg.js';
import Renderable from './Renderable';

const animationSpeed = 1;

export default class Renderer {
    private readonly svg = SVG().addTo('.svg-wrapper').size('100%', '100%');

    constructor() {
        console.log('width', this.svg.width());
        console.log('height', this.svg.height());
        // Wrong types. @See documentation svgjs.io
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.svg.transform({
            origin: 'top left',
            flip: 'y',
        });
    }

    /**
     * Clear the whole animation area
     */
    clear(): void {
        this.svg.clear();
    }

    render(renderable: Renderable): void {
        this.svg.add(renderable.getElement());
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
