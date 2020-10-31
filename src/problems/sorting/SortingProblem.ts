import Renderer from '../../display/Renderer';
import { Element, Rect } from '@svgdotjs/svg.js';
import Problem from '../Problem';

export class Bar {
    private readonly element: Element;

    constructor(private readonly id: number, private readonly value: number) {
        this.element = new Rect()
            .size(20, this.value)
            .move(100 + this.id * 25, 100)
            .fill('#58B7FF');
    }

    markRed(): void {
        this.element.attr('fill', '#FF4949');
    }

    markGreen(): void {
        this.element.attr('fill', '#13CE66');
    }

    unmark(): void {
        this.element.attr('fill', '#58B7FF');
    }

    getElement(): Element {
        return this.element;
    }

    getId(): number {
        return this.id;
    }

    getValue(): number {
        return this.value;
    }
}

export interface SortingProblemSolver {
    solve(values: Bar[], renderer: Renderer): Promise<void>;
}

export class BubbleSort implements SortingProblemSolver {
    async solve(values: Bar[], renderer: Renderer): Promise<void> {
        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < values.length - i - 1; j++) {
                await renderer.animate(() => {
                    values[j].markRed();
                    values[j + 1].markRed();
                });

                if (values[j].getValue() > values[j + 1].getValue()) {
                    const temp = values[j];
                    values[j] = values[j + 1];
                    values[j + 1] = temp;

                    await renderer.swapElementsById(values[j].getId(), values[j + 1].getId());
                }

                await renderer.animate(() => {
                    values[j].unmark();
                    values[j + 1].unmark();
                });
            }
            values[values.length - i - 1].markGreen();
        }
    }
}

export class SelectionSort implements SortingProblemSolver {
    async solve(values: Bar[], renderer: Renderer): Promise<void> {
        for (let i = 0; i < values.length; i++) {
            let smallestIndex = i;
            await renderer.animate(() => {
                values[i].markRed();
            });

            for (let j = i + 1; j < values.length; j++) {
                await renderer.animate(() => {
                    values[j].markRed();
                });

                if (values[j].getValue() < values[smallestIndex].getValue()) {
                    await renderer.animate(() => {
                        if (smallestIndex !== i) values[smallestIndex].unmark();
                        smallestIndex = j;
                        values[smallestIndex].markGreen();
                    });
                } else {
                    await renderer.animate(() => {
                        values[j].unmark();
                    });
                }
            }

            const temp = values[i];
            values[i] = values[smallestIndex];
            values[smallestIndex] = temp;

            await renderer.swapElementsById(values[i].getId(), values[smallestIndex].getId());

            await renderer.animate(() => {
                values[i].markGreen();
                values[smallestIndex].unmark();
            });
        }
    }
}

export default class SortingProblem implements Problem {
    private values: Bar[] = [];

    getAlgorithms(): string[] {
        return ['Bubblesort', 'Selectionsort'];
    }

    async solve(renderer: Renderer): Promise<void> {
        return new BubbleSort().solve(this.values, renderer);
    }

    render(renderer: Renderer): void {
        renderer.clear();
        this.values.forEach((v) => {
            renderer.display(v.getElement());
        });
    }

    generate(): void {
        this.values = [];
        for (let i = 0; i < 20; i++) {
            this.values.push(new Bar(i, Math.random() * 500));
        }
    }
}
