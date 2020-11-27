import Component from './Component';
import Point from './Point';
import Rectangle from './components/Rectangle';
import Line from './components/Line';
import Circle from './components/Circle';

export default interface Renderer {
    setAnimationSpeed(animationSpeed: number): void;

    clear(): void;

    render(component: Component): void;

    swapElementsById(id1: number, id2: number): Promise<void>;

    animate(func: () => void): Promise<void>;

    swap(a: Component, b: Component): Promise<void>;

    createRectangle(point: Point, width: number, height: number): Rectangle;

    createLine(a: Point, b: Point): Line;

    createCircle(position: Point, radius: number): Circle;
}
