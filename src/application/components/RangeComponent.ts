export default class RangeComponent {
    private readonly inputElement: HTMLInputElement;
    private readonly outputElement: HTMLOutputElement;

    constructor(
        private readonly id: string,
        private readonly min: number,
        private readonly max: number,
        private readonly initial: number,
    ) {
        this.inputElement = <HTMLInputElement>document.getElementById(id);
        this.inputElement.min = '' + min;
        this.inputElement.max = '' + max;
        this.inputElement.valueAsNumber = initial;
        this.outputElement = this.createOutputElement();
        this.updateOutputElementValue();
    }

    onUpdate(func: (value: number) => void): void {
        this.inputElement.oninput = () => {
            if (this.inputElement.valueAsNumber < this.min) {
                this.inputElement.valueAsNumber = this.min;
            }
            if (this.inputElement.valueAsNumber > this.max) {
                this.inputElement.valueAsNumber = this.max;
            }

            this.updateOutputElementValue();
            func(this.inputElement.valueAsNumber);
        };
    }

    getValue(): number {
        return this.inputElement.valueAsNumber;
    }

    private updateOutputElementValue() {
        this.outputElement.value = this.inputElement.value;
    }

    private createOutputElement() {
        const element = document.createElement('output');
        element.setAttribute('id', this.id + 'Output');
        this.inputElement.parentElement!.append(element);

        return element;
    }
}
