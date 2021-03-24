import SortingElement from './SortingElement';
import SortingProblemStats from './SortingProblemStats';
import CompareType from '../CompareType';
import Renderer from '../../renderer/Renderer';
import Point from '../../renderer/Point';

export default class SortableData {
  private readonly bars: SortingElement[] = [];
  private readonly stats = new SortingProblemStats();

  constructor(private readonly numbers: number[], private readonly renderer: Renderer) {
      this.createBars();
  }

  render(): void {
      this.renderer.clear();

      const barWidth = this.renderer.getWidth() / 50;
      const barPadding = 5;
      const offset = this.calculateRenderOffset(barWidth, barPadding);

      this.bars.forEach((el, index) => {
          const component = this.renderer.createRectangle(
              new Point(offset + index * (barWidth + barPadding), 100),
              barWidth,
              el.getValue()
          );
          component.setColor(el.getColor());
          component.setBorderColor(el.getColor());
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
      indexes.forEach(i => this.getElement(i).markComparing());

      return this.renderAnimated();
  }

  resetComparingElements(...indexes: number[]): void {
      indexes.forEach(i => this.getElement(i).unmark());
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

  private createBars() {
      this.numbers.forEach(value => this.bars.push(new SortingElement(value)));
  }

  private calculateRenderOffset(barWidth: number, barOffset: number): number {
      const centerOfRenderArea = this.renderer.getWidth() / 2;
      const widthOfGraph = this.bars.length * (barWidth + barOffset);

      return centerOfRenderArea - widthOfGraph / 2;
  }
}
