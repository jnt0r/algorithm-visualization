import Component from './Component';
import Point from './Point';
import Rectangle from './components/Rectangle';
import Line from './components/Line';
import Circle from './components/Circle';
import Text from './components/Text';
import Renderer from './Renderer';

export default abstract class BaseRenderer implements Renderer {
    protected animationSpeed = 10;

    setAnimationSpeed(animationSpeed: number): void {
        this.animationSpeed = animationSpeed;
    }

    async animate(): Promise<void> {
        return new Promise<void>((resolve) => {
            window.requestAnimationFrame(() => {
                setTimeout(() => {
                    resolve();
                }, this.animationSpeed);
            });
        });
    }

    abstract render(component: Component): void;

    abstract swapElementsById(id1: number, id2: number): Promise<void>;

    abstract createRectangle(point: Point, width: number, height: number): Rectangle;

    abstract createLine(a: Point, b: Point): Line;

    abstract createCircle(position: Point, radius: number): Circle;

    abstract clear(): void;

    abstract createText(position: Point, text: string): Text;

    abstract getHeight(): number;

    abstract getWidth(): number;
}
