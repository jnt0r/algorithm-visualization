import Renderer from '../display/Renderer';
import { Element, Rect } from '@svgdotjs/svg.js';

export class Bar {
    constructor(readonly id: number, readonly value: number, readonly x: number, readonly y: number) {}

    getElement(): Element {
        return new Rect()
            .attr('id', this.id)
            .size(this.value * 100, 20)
            .move(this.x, this.y)
            .fill('#000');
    }

    getId(): number {
        return this.id;
    }

    getValue(): number {
        return this.value;
    }
}

export default class SortingProblem {
    private numbers: Bar[] = [];

    constructor() {
        this.generate();
    }

    async solve(renderer: Renderer): Promise<void> {
        let finished = false;
        while (!finished) {
            finished = true;
            for (let j = 0; j < this.numbers.length - 1; j++) {
                await renderer.markComparing(this.numbers[j].getId(), this.numbers[j + 1].getId());
                // wait(200);
                if (this.numbers[j].getValue() > this.numbers[j + 1].getValue()) {
                    finished = false;

                    const temp = this.numbers[j];
                    this.numbers[j] = this.numbers[j + 1];
                    this.numbers[j + 1] = temp;

                    await renderer.swap(this.numbers[j].getId(), this.numbers[j + 1].getId());
                    // wait(200);
                }

                await renderer.unmarkComparing(this.numbers[j].getId(), this.numbers[j + 1].getId());
            }
        }

        // const interval = setInterval(() => {
        //     renderer.markComparing(this.numbers[j].getId(), this.numbers[j + 1].getId());
        //
        //     if (this.numbers[j].getValue() > this.numbers[j + 1].getValue()) {
        //         const temp = this.numbers[j];
        //         this.numbers[j] = this.numbers[j + 1];
        //         this.numbers[j + 1] = temp;
        //
        //         renderer.swap(this.numbers[j].getId(), this.numbers[j + 1].getId());
        //     }
        //
        //     renderer.unmarkComparing(this.numbers[j].getId(), this.numbers[j + 1].getId());
        //
        //     j++;
        //     if (j === this.numbers.length - 1) {
        //         j = 0;
        //         i--;
        //     }
        //     if (i === 0) {
        //         clearInterval(interval);
        //     }
        // }, 500);

        // renderer.markComparing(1, 2);
        // setTimeout(() => {
        //     renderer.unmarkComparing(1, 2);
        // }, 2000);
        // for (let i = this.numbers.length; i > 0; i--) {
        //     for (let j = 0; j < this.numbers.length - 1; j++) {
        //         console.log('comparing', j, j + 1);
        //         renderer.markComparing(j, j + 1);
        //         wait(500);
        //         if (this.numbers[j] > this.numbers[j + 1]) {
        //             console.log('swapping', j, j + 1);
        //             const temp = this.numbers[j];
        //             this.numbers[j] = this.numbers[j + 1];
        //             this.numbers[j + 1] = temp;
        //
        //             renderer.swap(j, j + 1);
        //             wait(500);
        //         }
        //         renderer.unmarkComparing(j, j + 1);
        //     }
        // }
        console.log(this.numbers);
    }

    render(renderer: Renderer) {
        renderer.clear();
        this.numbers.forEach((v) => {
            renderer.display(v.getElement());
        });
    }

    generate() {
        this.numbers = [];
        for (let i = 0; i < 20; i++) {
            this.numbers.push(new Bar(i, Math.random() * 10, 0, i * 22));
        }
    }
}
