import Point from '../../renderer/Point';

export default class SortingElementConfiguration {
    private readonly width: number;
    private readonly offset: number;
    private readonly padding = 5;

    constructor(
        private readonly availableWidth: number,
        private readonly availableHeight: number,
        private readonly numberOfElements: number,
    ) {
        this.width = availableWidth / 50;
        this.offset = this.calculateRenderOffset();
    }

    getWidth(): number {
        return this.width;
    }

    getPointForIndex(index: number): Point {
        return new Point(
            this.offset + index * (this.width + this.padding),
            this.availableHeight * 0.1);
    }

    private calculateRenderOffset(): number {
        const centerOfRenderArea = this.availableWidth / 2;
        const widthOfGraph = this.numberOfElements * (this.width + this.padding);

        return centerOfRenderArea - widthOfGraph / 2;
    }
}
