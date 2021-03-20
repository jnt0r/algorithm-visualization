export default class SelectComponent<T extends { toString(): string }> {
    private readonly select: HTMLSelectElement;

    private items: T[] = [];

    constructor(id: string) {
        this.select = <HTMLSelectElement>document.getElementById(id);
    }

    addItem(item: T): void {
        this.items.push(item);
        this.select.add(new Option(item.toString(), item.toString(), this.items.length === 0));
    }

    onUpdate(func: (selectedItem: T | undefined) => void): void {
        this.select.onchange = () => {
            func(this.getSelectedItem());
        };
    }

    getSelectedItem(): T | undefined {
        return this.items[this.items.findIndex((p) => p.toString() === this.select.value)];
    }

    clear(): void {
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
