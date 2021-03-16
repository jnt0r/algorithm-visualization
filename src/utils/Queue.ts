export default class Queue<T> {
    private readonly entries: T[] = [];

    push(entry: T): void {
        this.entries.push(entry);
    }

    pop(): T | undefined {
        return this.entries.shift();
    }

    getSize(): number {
        return this.entries.length;
    }

    isEmpty(): boolean {
        return this.entries.length === 0;
    }
}
