import ProblemStats, { ProblemStatsObserver } from '../../src/problems/ProblemStats';

describe('ProblemStats', () => {
    const stats = new ProblemStats();

    test('should create', () => {
        expect(stats).toBeDefined();
    });

    test('not existing stat should be undefined', () => {
        expect(stats.getStat('test')).toBeUndefined();
    });

    test('should set string stat correctly', () => {
        stats.setStat('testString', 'hello');

        expect(stats.getStat('testString')).toEqual('hello');
    });

    test('should set number stat correctly', () => {
        stats.setStat('testNumber', 99);

        expect(stats.getStat('testNumber')).toEqual(99);
    });

    test('should set boolean stat correctly', () => {
        stats.setStat('testBoolean', true);

        expect(stats.getStat('testBoolean')).toEqual(true);
    });

    test('should add number to stat correctly', () => {
        stats.setStat('numberStat', 10);

        expect(stats.getStat('numberStat')).toEqual(10);
        stats.add('numberStat', 2);
        expect(stats.getStat('numberStat')).toEqual(12);
        stats.add('numberStat', -3);
        expect(stats.getStat('numberStat')).toEqual(9);
    });

    test('add should throw error on non number stats', () => {
        expect(() => stats.add('notExistingStat', 2)).toThrow();
        expect(() => stats.add('testString', 2)).toThrow();
        expect(() => stats.add('testBoolean', 2)).toThrow();
    });

    describe('Subscribe', () => {
        test('subscriber should get notified when setting stat', () => {
            const stats = new ProblemStats();
            const subscriber: ProblemStatsObserver = {
                update: jest.fn(),
            };

            stats.subscribe(subscriber);
            stats.setStat('testStat', 0);

            expect(subscriber.update).toHaveBeenCalledWith(stats);
        });

        test('subscriber should get notified when adding to stat', () => {
            const stats = new ProblemStats();
            const subscriber: ProblemStatsObserver = {
                update: jest.fn(),
            };

            stats.subscribe(subscriber);
            stats.setStat('anotherTestStat', 2);
            stats.add('anotherTestStat', 5);

            expect(subscriber.update).toHaveBeenCalledWith(stats);
        });
    });
});
