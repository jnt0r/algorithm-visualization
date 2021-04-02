import Controller from '../../../src/application/frontend/Controller';
import { TestRenderer } from '../../TestRenderer';
import Problem from '../../../src/domain/problems/Problem';
import ProblemDisplay from '../../../src/application/frontend/components/ProblemDisplay';
import { instance, mock, verify, when } from 'ts-mockito';
import ProblemSolver from '../../../src/domain/problems/ProblemSolver';
import ProblemStatsObserver from '../../../src/domain/problems/ProblemStatsObserver';
import ProblemStats from '../../../src/domain/problems/ProblemStats';

describe('Controller', () => {
    const testRenderer = new TestRenderer();
    let controller: Controller;

    const generateMock = jest.fn();
    const renderMock = jest.fn();
    const resetMock = jest.fn();
    const solveMock = jest.fn().mockReturnValue(Promise.resolve());

    const statsMock: ProblemStats = mock(ProblemStats);
    const stats: ProblemStats = instance(statsMock);

    const stubProblem: Problem<never> = {
        generate: generateMock,
        render: renderMock,
        reset: resetMock,
        solve: solveMock,
        getStats: () => stats
    };
    const stubSolver: ProblemSolver<never, never, void> = {
        solve(data: never): Promise<void> {
            return Promise.resolve();
        }
    };

    const mockProblemDisplay: ProblemDisplay<any, any> = mock(ProblemDisplay);
    const problemDisplay = instance(mockProblemDisplay);

    beforeEach(() => {
        when(mockProblemDisplay.getProblem(testRenderer)).thenReturn(stubProblem);

        controller = new Controller(testRenderer, [
            problemDisplay
        ]);
    });

    test('getProblems should return all available problems', () => {
        expect(controller.getProblems()).toEqual([ problemDisplay ]);
    });

    test('setProblem should generate and render Problem', () => {
        controller.setProblem(problemDisplay);

        expect(generateMock).toBeCalled();
        expect(renderMock).toBeCalled();
    });

    test('generateProblem should generate and render Problem', () => {
        controller.setProblem(problemDisplay);
        controller.generateProblem();

        expect(generateMock).toBeCalled();
        expect(renderMock).toBeCalled();
    });

    test('resetProblem should reset and render Problem', () => {
        controller.setProblem(problemDisplay);
        controller.resetProblem();

        expect(resetMock).toBeCalled();
        expect(renderMock).toBeCalled();
    });

    test('solveProblem should reset problem, register stats callback, solve problem and unregister stats callback', async () => {
        controller.setProblem(problemDisplay);
        const mockObserver: ProblemStatsObserver = mock<ProblemStatsObserver>();
        const observer: ProblemStatsObserver = instance(mockObserver);

        await controller.solveProblem(stubSolver, observer);

        verify(statsMock.subscribe(observer)).once();
        expect(resetMock).toBeCalled();
        expect(solveMock).toBeCalledWith(stubSolver);
        verify(statsMock.unsubscribe(observer)).once();
    });

    test('setAnimationSpeed should set animationSpeed by percentage', () => {
        const spy = jest.spyOn(testRenderer.getAnimationSpeed(), 'setFromPercentage');

        controller.setAnimationSpeed(50);

        expect(spy).toHaveBeenCalledWith(50);
    });
});
