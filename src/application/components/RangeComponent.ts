export default class RangeComponent {
    private readonly inputElement!: HTMLInputElement;
    private readonly outputElement!: HTMLOutputElement;

    constructor(
        private readonly id: string,
        private readonly minValue: number,
        private readonly maxValue: number,
        private readonly initialValue: number,
    ) {
        this.inputElement = <HTMLInputElement>document.getElementById(id);
        this.outputElement = document.createElement('output');
        this.initializeInputElement();
        this.initializeOutputElement();
    }

    onUpdate(func: (value: number) => void): void {
        this.inputElement.oninput = () => {
            if (this.inputElement.valueAsNumber < this.minValue) {
                this.inputElement.valueAsNumber = this.minValue;
            }
            if (this.inputElement.valueAsNumber > this.maxValue) {
                this.inputElement.valueAsNumber = this.maxValue;
            }

            this.updateOutputElementValue();
            func(this.inputElement.valueAsNumber);
        };
    }

    getValue(): number {
        return this.inputElement.valueAsNumber;
    }

    private initializeOutputElement() {
        this.outputElement.setAttribute('id', this.id + 'Output');
        this.inputElement.parentElement!.append(this.outputElement);

        this.updateOutputElementValue();
    }

    private initializeInputElement() {
        this.inputElement.min = '' + this.minValue;
        this.inputElement.max = '' + this.maxValue;
        this.inputElement.valueAsNumber = this.initialValue;
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
