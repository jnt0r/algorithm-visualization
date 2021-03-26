import Component from './Component';
import Point from './Point';
import Rectangle from './components/Rectangle';
import Line from './components/Line';
import Circle from './components/Circle';
import Text from './components/Text';
import AnimationSpeed from './AnimationSpeed';

export default abstract class Renderer {
    private readonly animationSpeed = new AnimationSpeed();
    async animate(): Promise<void> {
        return new Promise<void>(resolve => {
            window.requestAnimationFrame(() => {
                setTimeout(() => {
                    resolve();
                }, this.animationSpeed.getValue());
            });
        });
    }

    abstract render(component: Component): void;

    abstract createRectangle(point: Point, width: number, height: number): Rectangle;

    abstract createLine(a: Point, b: Point): Line;

    abstract createCircle(position: Point, radius: number): Circle;

    abstract clear(): void;

    abstract createText(position: Point, text: string): Text;

    abstract getHeight(): number;

    abstract getWidth(): number;

    getAnimationSpeed(): AnimationSpeed {
        return this.animationSpeed;
    }
}
