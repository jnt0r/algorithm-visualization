import Problem from '../../domain/problems/Problem';
import ProblemSolver from '../../domain/problems/ProblemSolver';
import Renderer from '../../domain/renderer/Renderer';
import ProblemStatsObserver from '../../domain/problems/ProblemStatsObserver';
import ProblemDisplay from './components/ProblemDisplay';

export default class Controller {
    private currentProblem!: Problem<never>;

    constructor(
        private readonly renderer: Renderer,
        private readonly availableProblems: ProblemDisplay<Problem<never>, ProblemSolver<never, unknown, unknown>>[],
    ) {}

    getProblems(): ProblemDisplay<Problem<never>, ProblemSolver<never, unknown, unknown>>[] {
        return this.availableProblems;
    }

    setProblem(problem: ProblemDisplay<Problem<never>, ProblemSolver<never, unknown, unknown>>): void {
        this.currentProblem = problem.getProblem(this.renderer);
    }

    solveProblem(solver: ProblemSolver<never, unknown, unknown>, statsObserver: ProblemStatsObserver): Promise<void> {
        this.currentProblem.reset();

        this.currentProblem.getStats().subscribe(statsObserver);

        return this.currentProblem.solve(solver).then(() => this.currentProblem.getStats().unsubscribe(statsObserver));
    }

    resetProblem(): void {
        this.currentProblem.reset();
        this.currentProblem.render();
    }

    setAnimationSpeed(animationSpeed: number): void {
        this.renderer.setAnimationSpeed(this.convertAnimationSpeed(animationSpeed));
    }

    generateProblem(): void {
        this.currentProblem.generate();
        this.currentProblem.render();
    }

    /**
     * Converts animationSpeed from frontend to renderer.
     * Frontend allows to select animationSpeed as 1-100 in percent.
     * Renderer needs the animationSpeed as duration in ms
     *
     * @param animationSpeed in percent
     * @return animationSpeed in ms
     * @private
     */
    private convertAnimationSpeed(animationSpeed: number) {
        return 100 - 1 * animationSpeed;
    }
}
