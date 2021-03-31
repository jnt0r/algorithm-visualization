export default class ButtonComponent {
    private readonly element: HTMLButtonElement;

    constructor(private readonly id: string) {
        this.element = <HTMLButtonElement>document.getElementById(id);
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
