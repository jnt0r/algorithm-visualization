import Renderer from '../../renderer/Renderer';
import SortingElement from './SortingElement';
import Point from '../../renderer/Point';

export default class SortableData {
    private readonly bars: SortingElement[] = [];

    constructor(numbers: number[], private readonly renderer: Renderer) {
        numbers.forEach((value) => this.bars.push(new SortingElement(value)));
    }

    render(): void {
        this.renderer.clear();
        this.bars.forEach((el, index) => {
            const component = this.renderer.createRectangle(new Point(100 + index * 25, 100), 20, el.getValue());
            component.setColor(el.getColor());
            this.renderer.render(component);
        });
    }

    async renderAnimated(): Promise<void> {
        this.render();
        await this.renderer.animate();
    }

    async swap(a: number, b: number): Promise<void> {
        const temp = this.bars[a];
        this.bars[a] = this.bars[b];
        this.bars[b] = temp;
        await this.renderer.swapElementsById(a, b);
    }

    markComparingElements(...indexes: number[]): Promise<void> {
        indexes.forEach((i) => this.getElement(i).markComparing());

        return this.renderAnimated();
    }

    resetComparingElements(...indexes: number[]): void {
        indexes.forEach((i) => this.getElement(i).unmark());
        this.render();
    }

    getSize(): number {
        return this.bars.length;
    }

    getElement(index: number): SortingElement {
        return this.bars[index];
    }
}
