import BubbleSort from '../../src/problems/sorting/solver/BubbleSort';
import Renderer from '../../src/renderer/Renderer';
import Component from '../../src/renderer/Component';
import Rectangle from '../../src/renderer/components/Rectangle';
import Line from '../../src/renderer/components/Line';
import Point from '../../src/renderer/Point';
import Circle from '../../src/renderer/components/Circle';
import { SVGCircle } from '../../src/application/svgrenderer/SVGCircle';
import { SVGLine } from '../../src/application/svgrenderer/SVGLine';
import { SVGRectangle } from '../../src/application/svgrenderer/SVGRectangle';
import SortableData from '../../src/problems/sorting/SortableData';
import SortingProblemSolver from '../../src/problems/sorting/SortingProblemSolver';
import SelectionSort from '../../src/problems/sorting/solver/SelectionSort';
import QuickSort from '../../src/problems/sorting/solver/QuickSort';

const renderer: Renderer = {
    animate(): void {},
    clear(): void {},
    createCircle(position: Point, radius: number): Circle {
        return new SVGCircle(position, radius);
    },
    createLine(a: Point, b: Point): Line {
        return new SVGLine(a, b);
    },
    createRectangle(point: Point, width: number, height: number): Rectangle {
        return new SVGRectangle(point, width, height);
    },
    getHeight(): number {
        return 0;
    },
    getWidth(): number {
        return 0;
    },
    render(component: Component): void {},
    setAnimationSpeed(animationSpeed: number): void {},
    swapElementsById(id1: number, id2: number): void {},
};
const sortedData = new SortableData([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], renderer);
test('creation', () => {
    expect(sortedData).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(sortedData).toBeSorted();
});

test('BubbleSort', async () => {
    const sorter: SortingProblemSolver = new BubbleSort();
    const data = new SortableData([9, 1, 4, 8, 10, 2, 3, 6, 5, 7], renderer);

    await sorter.solve(data);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(data).toBeSorted();
});

test('SelectionSort', async () => {
    const sorter: SortingProblemSolver = new SelectionSort();
    const data = new SortableData([9, 1, 4, 8, 10, 2, 3, 6, 5, 7], renderer);

    await sorter.solve(data);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(data).toBeSorted();
});

test('QuickSort', async () => {
    const sorter: SortingProblemSolver = new QuickSort();
    const data = new SortableData([9, 1, 4, 8, 10, 2, 3, 6, 5, 7], renderer);

    await sorter.solve(data);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(data).toBeSorted();
});
