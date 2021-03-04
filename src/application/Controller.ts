import Problem from '../problems/Problem';
import ProblemSolver from '../problems/ProblemSolver';
import Renderer from '../renderer/Renderer';
import ProblemStatsObserver from '../problems/ProblemStatsObserver';
import ProblemDisplay from './components/ProblemDisplay';

export default class Controller {
    private problem!: Problem<never>;

    constructor(
        private readonly renderer: Renderer,
        private readonly availableProblems: ProblemDisplay<Problem<never>, ProblemSolver<never, unknown, unknown>>[],
    ) {}

    getProblems(): ProblemDisplay<Problem<never>, ProblemSolver<never, unknown, unknown>>[] {
        return this.availableProblems;
    }

    setProblem(problem: ProblemDisplay<Problem<never>, ProblemSolver<never, unknown, unknown>>): void {
        this.problem = problem.getProblem(this.renderer);
    }

    solveProblem(solver: ProblemSolver<never, unknown, unknown>, statsObserver: ProblemStatsObserver): Promise<void> {
        this.problem.reset();

        this.problem.getStats().subscribe(statsObserver);

        return this.problem.solve(solver).then(() => this.problem.getStats().unsubscribe(statsObserver));
    }

    resetProblem(): void {
        this.problem.reset();
        this.problem.render();
    }

    setAnimationSpeed(animationSpeed: number): void {
        this.renderer.setAnimationSpeed(this.convertAnimationSpeed(animationSpeed));
    }

    generateProblem(): void {
        this.problem.generate();
        this.problem.render();
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
        return 1000 - 10 * animationSpeed;
    }
}
