import Rectangle from '../../renderer/components/Rectangle';
import Point from '../../renderer/Point';
import Renderable from '../../renderer/Renderable';
import Renderer from '../../renderer/Renderer';

export default class Bar implements Renderable {
    private readonly defaultColor = '#58B7FF';
    private sorted = false;
    private readonly rectangle: Rectangle;

    constructor(private readonly id: number, private readonly value: number, private readonly renderer: Renderer) {
        this.rectangle = renderer.createRectangle(new Point(100 + id * 25, 100), 20, value);
        this.rectangle.setColor(this.defaultColor);
    }

    markRed(): void {
        this.rectangle.setColor('#FF4949');
    }

    setSorted(): void {
        this.sorted = true;
        this.rectangle.setColor('#13CE66');
    }

    unmark(): void {
        if (!this.sorted) {
            this.rectangle.setColor(this.defaultColor);
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
