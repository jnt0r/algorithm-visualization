import SortingElement from './SortingElement';
import SortingProblemStats from './SortingProblemStats';
import CompareType from '../CompareType';
import Renderer from '../../renderer/Renderer';
import SortingElementConfiguration from './SortingElementConfiguration';

export default class SortableData {
    private readonly bars: SortingElement[] = [];
    private readonly stats = new SortingProblemStats();
    private readonly elementConfiguration: SortingElementConfiguration;

    constructor(private readonly numbers: number[], private readonly renderer: Renderer) {
        this.renderer.clear();
        this.elementConfiguration = new SortingElementConfiguration(
            this.renderer.getWidth(),
            this.renderer.getHeight(),
            numbers.length);
        this.convertNumbersToBars();
    }

    async swap(a: number, b: number): Promise<void> {
        this.stats.addSwap();

        [ this.bars[a], this.bars[b] ] = [ this.bars[b], this.bars[a] ];

        await Promise.all([
            this.bars[a].setIndex(a),
            this.bars[b].setIndex(b)
        ]);
    }

    compareElements(a: number, compareType: CompareType, b: number): boolean {
        this.stats.addComparison();

        return compareType.compare(this.getElement(a).getValue(), this.getElement(b).getValue());
    }

    markComparingElements(...indexes: number[]): Promise<void> {
        indexes.forEach(i => this.getElement(i).markComparing());

        return this.renderer.animate();
    }

    resetComparingElements(...indexes: number[]): void {
        indexes.forEach(i => this.getElement(i).unmark());
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

    private convertNumbersToBars() {
        this.numbers.forEach((value, index) => {
            this.bars.push(new SortingElement(value, index, this.elementConfiguration, this.renderer));
        });
    }
}
