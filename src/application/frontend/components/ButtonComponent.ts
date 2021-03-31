import HtmlComponent from './HtmlComponent';

export default class ButtonComponent extends HtmlComponent<HTMLButtonElement>{

    constructor(private readonly id: string) {
        super(id);
    }

    onClick(func: () => void): void {
        this.element.onclick = func;
    }

    disable(): void {
        this.element.disabled = true;
    }

    enable(): void {
        this.element.disabled = false;
    }
}
