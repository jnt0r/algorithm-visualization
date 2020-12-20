import Rectangle from '../../renderer/components/Rectangle';
import Point from '../../renderer/Point';
import Renderable from '../../renderer/Renderable';
import Renderer from '../../renderer/Renderer';

export default class SortingElement implements Renderable {
    private readonly defaultColor = '#58B7FF';
    private sorted = false;
    private readonly rectangle: Rectangle;

    constructor(private readonly id: number, private readonly value: number, private readonly renderer: Renderer) {
        this.rectangle = renderer.createRectangle(new Point(100 + id * 25, 100), 20, value);
        this.setColor(this.defaultColor);
    }

    setColor(hexCode: string): void {
        this.rectangle.setColor(hexCode);
    }

    markComparing(): void {
        this.setColor('#FF4949');
    }

    setSorted(): void {
        this.sorted = true;
        this.setColor('#13CE66');
    }

    unmark(): void {
        if (!this.sorted) {
            this.setColor(this.defaultColor);
        } else {
            this.setSorted();
        }
    }

    getId(): number {
        return this.id;
    }

    getValue(): number {
        return this.value;
    }

    render(renderer: Renderer): void {
        renderer.render(this.rectangle);
    }
}
