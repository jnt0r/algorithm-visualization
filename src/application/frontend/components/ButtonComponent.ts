import HtmlComponent from './HtmlComponent';

export default class ButtonComponent extends HtmlComponent<HTMLButtonElement>{

    constructor(private readonly id: string) {
        super(id);
    }

    onClick(func: () => void): void {
        this.element.onclick = func;
    }

    /**
     * @Override
     */
    disable(): void {
        this.element.disabled = true;
    }

    /**
     * @Override
     */
    enable(): void {
        this.element.disabled = false;
    }
}
