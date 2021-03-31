import HtmlComponent from './HtmlComponent';

export default class RangeComponent extends HtmlComponent<HTMLInputElement> {
    private readonly outputElement!: HTMLOutputElement;

    constructor(
        private readonly id: string,
        private readonly minValue: number,
        private readonly maxValue: number,
        private readonly initialValue: number,
    ) {
        super(id);
        this.outputElement = document.createElement('output');
        this.initializeInputElement();
        this.initializeOutputElement();
    }

    onUpdate(func: (value: number) => void): void {
        this.element.oninput = () => {
            if (this.element.valueAsNumber < this.minValue) {
                this.element.valueAsNumber = this.minValue;
            }
            if (this.element.valueAsNumber > this.maxValue) {
                this.element.valueAsNumber = this.maxValue;
            }

            this.updateOutputElementValue();
            func(this.element.valueAsNumber);
        };
    }

    getValue(): number {
        return this.element.valueAsNumber;
    }

    private initializeOutputElement() {
        this.outputElement.setAttribute('id', this.id + 'Output');
        this.element.parentElement!.append(this.outputElement);

        this.updateOutputElementValue();
    }

    private initializeInputElement() {
        this.element.min = '' + this.minValue;
        this.element.max = '' + this.maxValue;
        this.element.valueAsNumber = this.initialValue;
    }

    private updateOutputElementValue() {
        this.outputElement.value = this.element.value;
    }

    private createOutputElement() {
        const element = document.createElement('output');
        element.setAttribute('id', this.id + 'Output');
        this.element.parentElement!.append(element);

        return element;
    }
}
