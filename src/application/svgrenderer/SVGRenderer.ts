import { SVG } from '@svgdotjs/svg.js';
import Renderer from '../../renderer/Renderer';
import Point from '../../renderer/Point';
import Rectangle from '../../renderer/components/Rectangle';
import Line from '../../renderer/components/Line';
import Circle from '../../renderer/components/Circle';
import { SVGRectangle } from './SVGRectangle';
import { SVGLine } from './SVGLine';
import { SVGCircle } from './SVGCircle';

export default class SVGRenderer implements Renderer {
    private animationSpeed = 10;
    private readonly svg = SVG().addTo('.svg-wrapper').size('100%', '100%');

    constructor() {
        this.svg.transform({
            flip: 'y',
        });
    }

    setAnimationSpeed(animationSpeed: number): void {
        this.animationSpeed = animationSpeed;
    }

    getHeight(): number {
        return document.getElementsByClassName('svg-wrapper')[0].clientHeight;
    }

    getWidth(): number {
        return document.getElementsByClassName('svg-wrapper')[0].clientWidth;
    }

    /**
     * Clear the whole animation area
     */
    clear(): void {
        this.svg.clear();
    }

    render(component: SVGRectangle): void {
        this.svg.add(component.getElement());
    }

    swapElementsById(elementId1: number, elementId2: number): Promise<void> {
        const e1 = this.svg.get(elementId1);
        const e2 = this.svg.get(elementId2);
        e1.animate({ delay: 0, duration: this.animationSpeed }).move(e2.x(), e2.y());
        e2.animate({ delay: 0, duration: this.animationSpeed }).move(e1.x(), e1.y());

        return this.animate();
    }

    async animate(): Promise<void> {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, this.animationSpeed);
        });
        // return new Promise<void>((resolve) => {
        //     window.requestAnimationFrame(() => {
        //         setTimeout(() => {
        //             resolve();
        //         }, this.animationSpeed);
        //     });
        // });
    }

    // async swap(a: SVGRectangle, b: SVGRectangle): Promise<void> {
    //     await this.animate(() => {
    //         const x = a.getElement().x();
    //         const y = a.getElement().y();
    //         a.getElement()
    //             .animate({ delay: 0, duration: this.animationSpeed })
    //             .move(b.getElement().x(), b.getElement().y());
    //         b.getElement().animate({ delay: 0, duration: this.animationSpeed }).move(x, y);
    //     });
    // }

    createRectangle(point: Point, width: number, height: number): Rectangle {
        return new SVGRectangle(point, width, height);
    }

    createLine(a: Point, b: Point): Line {
        return new SVGLine(a, b);
    }

    createCircle(position: Point, radius: number): Circle {
        return new SVGCircle(position, radius);
    }
}
