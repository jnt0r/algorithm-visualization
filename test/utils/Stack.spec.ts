import Stack from '../../src/utils/Stack';

describe('Stack', () => {
    let stack: Stack<number>;

    beforeEach(() => {
        stack = new Stack<number>();
    });

    test('pop on empty Stack should return undefined', () => {
        expect(stack.pop()).toBeUndefined();
    });

    test('pop should return only element on stack', () => {
        stack.push(9);
        expect(stack.pop()).toEqual(9);
    });

    test('pop should return elements in order of pushing', () => {
        stack.push(9);
        stack.push(8);
        stack.push(7);
        stack.push(6);
        expect(stack.pop()).toEqual(6);
        expect(stack.pop()).toEqual(7);
        expect(stack.pop()).toEqual(8);
        expect(stack.pop()).toEqual(9);
    });

    test('isEmpty should return true if stack is empty', () => {
        expect(stack.isEmpty()).toBeTruthy();
    });

    test('isEmpty should return false if stack is not empty', () => {
        stack.push(0);
        expect(stack.isEmpty()).toBeFalsy();
    });

    test('getSize should return 0 if stack is empty', () => {
        expect(stack.getSize()).toEqual(0);
    });

    test('getSize should return size of stack', () => {
        stack.push(0);
        stack.push(1);
        stack.push(2);
        expect(stack.getSize()).toEqual(3);
    });
});
