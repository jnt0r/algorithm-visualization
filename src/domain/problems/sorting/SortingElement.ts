import Renderer from '../../renderer/Renderer';
import Rectangle from '../../renderer/components/Rectangle';
import Point from '../../renderer/Point';

export default class SortingElement {
    private readonly _defaultColor = '#58B7FF';
    private readonly _comparisonColor = '#FF4949';
    private readonly _sortedColor = '#13CE66';
    private readonly _pivotColor = '#7f00ff';

    private readonly component: Rectangle;

    private _isSorted = false;
    private color = this._defaultColor;

    constructor(private readonly value: number, private index: number, private readonly renderer: Renderer) {
        this.component = this.createComponent();
        this.render();
    }

    setIndex(index: number): Promise<void> {
        this.index = index;

        return this.component.moveTo(this.getPoint());
    }

    render(): void {
        this.component.setColor(this.getColor());
        this.component.setBorderColor(this.getColor());
        this.renderer.render(this.component);
    }

    isSorted(): boolean {
        return this._isSorted;
    }

    getColor(): string {
        return this.color;
    }

    setColor(hexCode: string): void {
        this.color = hexCode;
        this.render();
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
        } else {
            this.setSorted();
        }
    }

    getValue(): number {
        return this.value;
    }

    private createComponent() {
        const width = this.renderer.getWidth() / 50;

        return this.renderer.createRectangle(
            this.getPoint(),
            width,
            this.value
        );
    }

    private getPoint() {
        const width = this.renderer.getWidth() / 50;
        const padding = 5;
        const offset = this.calculateRenderOffset(width, padding);

        return new Point(offset + this.index * (width + padding), 100);
    }

    private calculateRenderOffset(barWidth: number, barOffset: number): number {
        const centerOfRenderArea = this.renderer.getWidth() / 2;
        const widthOfGraph = 20 * (barWidth + barOffset);

        return centerOfRenderArea - widthOfGraph / 2;
    }
}
