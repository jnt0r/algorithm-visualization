import Renderer from '../../renderer/Renderer';
import SortingElement from './SortingElement';
import Point from '../../renderer/Point';
import SortingProblemStats from './SortingProblemStats';
import CompareType from '../CompareType';

export default class SortableData {
    private readonly bars: SortingElement[] = [];
    private readonly stats = new SortingProblemStats();

    constructor(numbers: number[], private readonly renderer: Renderer) {
        numbers.forEach((value) => this.bars.push(new SortingElement(value)));
    }

    render(): void {
        this.renderer.clear();
        this.bars.forEach((el, index) => {
            const component = this.renderer.createRectangle(
                new Point(100 + index * (this.renderer.getWidth() / 50 + 5), 100),
                this.renderer.getWidth() / 50,
                el.getValue(),
            );
            component.setColor(el.getColor());
            this.renderer.render(component);
        });
    }

    renderAnimated(): Promise<void> {
        this.render();

        return this.renderer.animate();
    }

    swap(a: number, b: number): Promise<void> {
        this.stats.addSwap();
        const temp = this.bars[a];
        this.bars[a] = this.bars[b];
        this.bars[b] = temp;

        return this.renderer.swapElementsById(a, b);
    }

    compareElements(a: number, compareType: CompareType, b: number): boolean {
        this.stats.addComparison();

        return compareType.compare(this.getElement(a).getValue(), this.getElement(b).getValue());
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

    getStats(): SortingProblemStats {
        return this.stats;
    }
}
