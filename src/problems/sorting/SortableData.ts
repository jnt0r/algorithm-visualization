import Renderer from '../../renderer/Renderer';
import Bar from './Bar';

export default class SortableData {
    private readonly bars: Bar[] = [];

    constructor(numbers: number[], private readonly renderer: Renderer) {
        numbers.forEach((value, index) => this.bars.push(new Bar(index, value, renderer)));
    }

    render(renderer: Renderer): void {
        this.bars.forEach((v) => v.render(renderer));
    }

    async swap(a: number, b: number, renderer: Renderer): Promise<void> {
        const temp = this.bars[a];
        this.bars[a] = this.bars[b];
        this.bars[b] = temp;
        await renderer.swapElementsById(this.bars[a].getId(), this.bars[b].getId());
    }

    getSize(): number {
        return this.bars.length;
    }

    getElement(index: number): Bar {
        return this.bars[index];
    }
}
