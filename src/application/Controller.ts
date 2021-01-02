import Problem from '../problems/Problem';
import ProblemSolver from '../problems/ProblemSolver';
import Renderer from '../renderer/Renderer';
import ProblemStats from '../problems/ProblemStats';

export default class Controller {
    private problem!: Problem<never>;

    constructor(private readonly renderer: Renderer) {}

    setProblem(problem: Problem<never>): void {
        this.problem = problem;
    }

    solveProblem(solver: ProblemSolver<never>): Promise<ProblemStats> {
        this.problem.reset();

        return this.problem.solve(solver).then(() => this.problem.getStats());
    }

    resetProblem(): void {
        this.problem.reset();
        this.problem.render();
    }

    setAnimationSpeed(animationSpeed: number): void {
        this.renderer.setAnimationSpeed(animationSpeed);
    }

    regenerateProblem(): void {
        this.problem.generate();
        this.problem.render();
    }
}
