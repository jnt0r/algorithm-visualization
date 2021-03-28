import AnimationSpeed from '../../../src/domain/renderer/AnimationSpeed';

describe('AnimationSpeed', () => {
    let animationSpeed: AnimationSpeed;

    beforeEach(() => {
        animationSpeed = new AnimationSpeed();
    });

    it('setValue should set value if greater than 0', () => {
        animationSpeed.setValue(10);

        expect(animationSpeed.getValue()).toBe(10);
    });

    it('setValue should set value to 0 if value is less than 0', () => {
        animationSpeed.setValue(-10);

        expect(animationSpeed.getValue()).toBe(0);
    });

    it('setFromPercentage should set value to 0 on 100%', () => {
        animationSpeed.setFromPercentage(100);

        expect(animationSpeed.getValue()).toBe(0);
    });

    it('setFromPercentage should set value to 500 on 50%', () => {
        animationSpeed.setFromPercentage(50);

        expect(animationSpeed.getValue()).toBe(500);
    });

    it('setFromPercentage should throw Error when percentage less than 0', () => {
        expect(() => animationSpeed.setFromPercentage(-1)).toThrowError(/^IllegalArgument: (.*)$/);
    });

    it('setFromPercentage should throw Error when percentage greater than 100', () => {
        expect(() => animationSpeed.setFromPercentage(101)).toThrowError(/^IllegalArgument: (.*)$/);
    });
});
