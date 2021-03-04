import ProblemStats from '../../src/problems/ProblemStats';
import ProblemStatsObserver from '../../src/problems/ProblemStatsObserver';
import { instance, mock, reset, verify } from 'ts-mockito';

describe('ProblemStats', () => {
    let stats: ProblemStats;

    beforeEach(() => {
        stats = new ProblemStats();
    });

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

    test('add should throw error on not existing stat', () => {
        expect(() => stats.add('notExistingStat', 2)).toThrow(
            new Error(
                "IllegalArgumentError: Stat with key 'notExistingStat' does not exist. Can only add number to existing stat of type 'number'",
            ),
        );
    });

    test('add should throw error on string stat', () => {
        stats.setStat('testString', 'someValue');

        expect(() => stats.add('testString', 2)).toThrow(
            new Error(
                "IllegalArgumentError: Can only add number to stat that is of type 'number'. Stat with key 'testString' is of type 'string'",
            ),
        );
    });

    test('add should throw error on boolean stat', () => {
        stats.setStat('testBoolean', true);

        expect(() => stats.add('testBoolean', 2)).toThrow(
            new Error(
                "IllegalArgumentError: Can only add number to stat that is of type 'number'. Stat with key 'testBoolean' is of type 'boolean'",
            ),
        );
    });

    describe('Subscribe', () => {
        let stats: ProblemStats;
        const subscriber: ProblemStatsObserver = mock<ProblemStatsObserver>();

        beforeEach(() => {
            reset(subscriber);
            stats = new ProblemStats();
            stats.subscribe(instance(subscriber));
        });

        test('subscriber should get notified when setting stat', () => {
            stats.setStat('testStat', 0);

            verify(subscriber.update(stats)).once();
        });

        test('subscriber should get notified when adding to stat', () => {
            stats.setStat('anotherTestStat', 2);
            stats.add('anotherTestStat', 5);

            verify(subscriber.update(stats)).twice();
        });

        test('subscriber should not get notified after unsubscribed', () => {
            stats.unsubscribe(subscriber);
            stats.setStat('anotherTestStat', 10);

            verify(subscriber.update(stats)).never();
        });
    });
});
