import Renderer from '../../renderer/Renderer';
import Rectangle from '../../renderer/components/Rectangle';
import SortingElementConfiguration from './SortingElementConfiguration';

export default class SortingElement {
    private readonly _defaultColor = '#58B7FF';
    private readonly _comparisonColor = '#FF4949';
    private readonly _sortedColor = '#13CE66';
    private readonly _pivotColor = '#7f00ff';

    private readonly component: Rectangle;

    private _isSorted = false;
    private color = this._defaultColor;

    constructor(
      private readonly value: number,
      private index: number,
      private readonly config: SortingElementConfiguration,
      private readonly renderer: Renderer
    ) {
        this.component = this.createComponent();
        this.renderer.render(this.component);
        this.updateComponentColors();
    }

    setIndex(index: number): Promise<void> {
        this.index = index;

        return this.component.moveTo(this.config.getPointForIndex(this.index));
    }

    isSorted(): boolean {
        return this._isSorted;
    }

    markComparing(): void {
        this.setColor(this._comparisonColor);
    }

    markPivot(): void {
        this.setColor(this._pivotColor);
    }

    setSorted(): void {
        this._isSorted = true;
        this.setColor(this._sortedColor);
    }

    unmark(): void {
        if (!this._isSorted) {
            this.setColor(this._defaultColor);
        }
    }

    getValue(): number {
        return this.value;
    }

    private setColor(hexCode: string): void {
        this.color = hexCode;
        this.updateComponentColors();
    }

    private updateComponentColors(): void {
        this.component.setColor(this.color);
        this.component.setBorderColor(this.color);
    }

    private createComponent(): Rectangle {
        return this.renderer.createRectangle(
            this.config.getPointForIndex(this.index),
            this.config.getWidth(),
            this.value
        );
    }
}
