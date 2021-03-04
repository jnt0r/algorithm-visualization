import Problem from '../problems/Problem';
import ProblemSolver from '../problems/ProblemSolver';
import Renderer from '../renderer/Renderer';
import ProblemStatsObserver from '../problems/ProblemStatsObserver';

export default class Controller {
    private problem!: Problem<never>;

    constructor(private readonly renderer: Renderer) {}

    setProblem(problem: Problem<never>): void {
        this.problem = problem;
    }

    solveProblem(solver: ProblemSolver<never>, statsObserver: ProblemStatsObserver): Promise<void> {
        this.problem.reset();

        this.problem.getStats().subscribe(statsObserver);

        return this.problem.solve(solver).then(() => this.problem.getStats().unsubscribe(statsObserver));
    }

    resetProblem(): void {
        this.problem.reset();
        this.problem.render();
    }

    setAnimationSpeed(animationSpeed: number): void {
        // Calculate animationSpeed for renderer
        // Frontend and renderer have different interpretation of the animationSpeed
        // frontend allows to select 1-100% speed
        // Renderer takes it as duration in ms
        this.renderer.setAnimationSpeed(1000 - 10 * animationSpeed);
    }

    generateProblem(): void {
        this.problem.generate();
        this.problem.render();
    }
}
