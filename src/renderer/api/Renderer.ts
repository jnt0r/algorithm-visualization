import Component from './Component';
import Point from './Point';
import Rectangle from './components/Rectangle';
import Line from './components/Line';
import Circle from './components/Circle';
import Text from './components/Text';

export default interface Renderer {
    setAnimationSpeed(animationSpeed: number): void;

    getHeight(): number;

    getWidth(): number;

    clear(): void;

    render(component: Component): void;

    swapElementsById(id1: number, id2: number): Promise<void>;

    animate(): Promise<void>;

    createRectangle(point: Point, width: number, height: number): Rectangle;

    createLine(a: Point, b: Point): Line;

    createCircle(position: Point, radius: number): Circle;

    createText(position: Point, text: string): Text;
}
