import Renderer from '../../renderer/Renderer';
import SortingElement from './SortingElement';

export default class SortableData {
    private readonly bars: SortingElement[] = [];

    constructor(numbers: number[], private readonly renderer: Renderer) {
        numbers.forEach((value, index) => this.bars.push(new SortingElement(index, value, renderer)));
    }

    render(renderer: Renderer): void {
        this.bars.forEach((v) => v.render(renderer));
    }

    async swap(a: number, b: number): Promise<void> {
        const temp = this.bars[a];
        this.bars[a] = this.bars[b];
        this.bars[b] = temp;
        //await this.renderer.swapElementsById(this.bars[a].getId(), this.bars[b].getId());
    }

    markComparingElements(...indexes: number[]): Promise<void> {
        return this.renderer.animate(() => {
            indexes.forEach((i) => this.getElement(i).markComparing());
        });
    }

    resetComparingElements(...indexes: number[]): Promise<void> {
        return this.renderer.animate(() => {
            indexes.forEach((i) => this.getElement(i).unmark());
        });
    }

    getSize(): number {
        return this.bars.length;
    }

    getElement(index: number): SortingElement {
        return this.bars[index];
    }
}
