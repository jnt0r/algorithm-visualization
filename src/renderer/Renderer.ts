import Component from './Component';
import Point from './Point';
import Rectangle from './components/Rectangle';

export default interface Renderer {
    setAnimationSpeed(animationSpeed: number): void;

    clear(): void;

    render(component: Component): void;

    swapElementsById(id1: number, id2: number): void;

    animate(func: () => void): void;

    swap(a: Component, b: Component): void;

    createRectangle(point: Point, width: number, height: number): Rectangle;
}
