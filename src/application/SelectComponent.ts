// eslint-disable-next-line @typescript-eslint/ban-types
export default class SelectComponent<T extends Object> {
    private readonly select: HTMLSelectElement;

    private items: T[] = [];

    constructor(id: string) {
        this.select = <HTMLSelectElement>document.getElementById(id);
    }

    addItem(problem: T): void {
        this.items.push(problem);
        this.select.add(new Option(problem.toString(), problem.toString(), this.items.length === 0));
    }

    onUpdate(func: (selectedItem: T | undefined) => void): void {
        this.select.onchange = () => {
            func(this.getSelectedItem());
        };
    }

    getSelectedItem(): T {
        return this.items[this.items.findIndex((p) => p.toString() === this.select.value)];
    }

    empty(): void {
        this.items = [];
        this.select.options.length = 0;
    }

    disable(): void {
        this.select.disabled = true;
    }

    enable(): void {
        this.select.disabled = false;
    }
}
