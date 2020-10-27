import { Element, SVG } from '@svgdotjs/svg.js';

const animationSpeed = 1;

export default class Renderer {
    private readonly svg = SVG('#svg-animation-frame');

    clear(): void {
        this.svg.clear();
    }

    display(rect: Element): void {
        rect.addTo(this.svg);
    }

    async markComparing(a: number, b: number): Promise<void> {
        return new Promise((resolve) => {
            this.svg.get(a).attr('fill', '#F00');
            this.svg.get(b).attr('fill', '#F00');

            // Wait for the transition to end!
            window.requestAnimationFrame(function () {
                setTimeout(() => {
                    resolve();
                }, animationSpeed);
            });
        });
    }

    async unmarkComparing(a: number, b: number): Promise<void> {
        return new Promise((resolve) => {
            this.svg.get(a).attr('fill', '#000');
            this.svg.get(b).attr('fill', '#000');

            // Wait for the transition to end!
            window.requestAnimationFrame(function () {
                setTimeout(() => {
                    resolve();
                }, animationSpeed);
            });
        });
    }

    async swap(a: number, b: number): Promise<void> {
        return new Promise((resolve) => {
            const e1 = this.svg.get(a);
            const e2 = this.svg.get(b);
            e1.animate({ delay: 0, duration: animationSpeed }).move(0, e2.y());
            e2.animate({ delay: 0, duration: animationSpeed }).move(0, e1.y());

            // Wait for the transition to end!
            window.requestAnimationFrame(function () {
                setTimeout(() => {
                    resolve();
                }, animationSpeed);
            });
        });
    }
}
