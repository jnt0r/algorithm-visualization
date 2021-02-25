export interface ProblemStatsObserver {
    update(stats: ProblemStats): void;
}

export default class ProblemStats {
    private readonly observers: ProblemStatsObserver[] = [];
    private readonly stats: Map<string, unknown> = new Map<string, unknown>();

    setStat(key: string, value: unknown): void {
        this.stats.set(key, value);
        this.notify();
    }

    subscribe(observer: ProblemStatsObserver): void {
        this.observers.push(observer);
    }

    unsubscribe(observer: ProblemStatsObserver): void {
        this.observers.splice(this.observers.indexOf(observer), 1);
    }

    getStat(key: string): unknown | undefined {
        return this.stats.get(key);
    }

    add(key: string, value: number): void {
        if (!this.stats.has(key)) {
            throw new Error(
                `IllegalArgumentError: Stat with key '${key}' does not exist. Can only add number to existing stat of type 'number'`,
            );
        }
        if (typeof this.getStat(key) !== 'number') {
            throw new Error(
                `IllegalArgumentError: Can only add number to stat that is of type 'number'. Stat with key '${key}' is of type '${typeof this.getStat(
                    key,
                )}'`,
            );
        }
        this.stats.set(key, (this.stats.get(key) as number) + value);
        this.notify();
    }

    getStats(): Map<string, unknown> {
        return this.stats;
    }

    private notify() {
        this.observers.forEach((subscriber) => subscriber.update(this));
    }
}
