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
        this.currentProblem.generate();
        this.currentProblem.render();
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
        this.renderer.getAnimationSpeed().setFromPercentage(animationSpeed);
    }

    generateProblem(): void {
        this.currentProblem.generate();
        this.currentProblem.render();
    }
}
