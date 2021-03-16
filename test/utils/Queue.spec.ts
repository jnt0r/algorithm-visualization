import Queue from '../../src/utils/Queue';

describe('Queue', () => {
    let queue: Queue<number>;

    beforeEach(() => {
        queue = new Queue<number>();
    });

    test('pop on empty Queue should return undefined', () => {
        expect(queue.pop()).toBeUndefined();
    });

    test('pop should return only element in queue', () => {
        queue.push(9);
        expect(queue.pop()).toEqual(9);
    });

    test('pop should return elements in queue', () => {
        queue.push(9);
        queue.push(8);
        queue.push(7);
        queue.push(6);
        expect(queue.pop()).toEqual(9);
        expect(queue.pop()).toEqual(8);
        expect(queue.pop()).toEqual(7);
        expect(queue.pop()).toEqual(6);
    });

    test('isEmpty should return true if queue is empty', () => {
        expect(queue.isEmpty()).toBeTruthy();
    });

    test('isEmpty should return false if queue is not empty', () => {
        queue.push(0);
        expect(queue.isEmpty()).toBeFalsy();
    });

    test('getSize should return 0 if queue is empty', () => {
        expect(queue.getSize()).toEqual(0);
    });

    test('getSize should return size of queue', () => {
        queue.push(0);
        queue.push(1);
        queue.push(2);
        expect(queue.getSize()).toEqual(3);
    });
});
