export default class ProblemStats {
    // eslint-disable-next-line @typescript-eslint/ban-types
    private readonly stats: Map<string, Object> = new Map<string, Object>();

    // eslint-disable-next-line @typescript-eslint/ban-types
    setStat(key: string, value: Object): void {
        this.stats.set(key, value);
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    getStat(key: string): Object | undefined {
        return this.stats.get(key);
    }

    add(key: string, value: number): void {
        if (typeof this.getStat(key) !== 'number') {
            throw new Error(
                `IllegalArgumentError: Can only add number to stat that is of type 'number'. Stat with key '${key}' is of type '${typeof this.getStat(
                    key,
                )}'`,
            );
        }
        this.stats.set(key, (this.stats.get(key) as number) + value);
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    getStats(): Map<string, Object> {
        return this.stats;
    }
}
