import HtmlComponent from './HtmlComponent';

export default class SelectComponent<T extends { toString(): string }> extends HtmlComponent<HTMLSelectElement> {
    private items: T[] = [];

    constructor(private readonly id: string) {
        super(id);
    }

    addItem(item: T): void {
        this.items.push(item);
        this.element.add(new Option(item.toString(), item.toString(), this.items.length === 0));
    }

    onUpdate(func: (selectedItem: T | undefined) => void): void {
        this.element.onchange = () => {
            func(this.getSelectedItem());
        };
    }

    getSelectedItem(): T | undefined {
        return this.items[this.items.findIndex(p => p.toString() === this.element.value)];
    }

    clear(): void {
        this.items = [];
        this.element.options.length = 0;
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
