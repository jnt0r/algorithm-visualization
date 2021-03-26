export default class AnimationSpeed {
    private value = 500;

    getValue(): number {
        return this.value;
    }

    setValue(newValue: number): void {
        if (newValue < 0) {
            newValue = 0;
        }
        this.value = newValue;
    }

    setFromPercentage(percent: number): void {
        if (percent < 0 || percent > 100) {
            throw new Error('IllegalArgument: Percent must be greater than 0 and cannot be greater than 100.');
        }

        this.setValue(1000 - 10 * percent);
    }
}
