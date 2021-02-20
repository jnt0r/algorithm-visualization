import Problem from '../problems/Problem';
import ProblemSolver from '../problems/ProblemSolver';
import Renderer from '../renderer/Renderer';
import ProblemStats from '../problems/ProblemStats';
import Application from './Application';

export default class Controller {
    private problem!: Problem<never>;

    constructor(private readonly renderer: Renderer) {}

    setProblem(problem: Problem<never>): void {
        this.problem = problem;
    }

    solveProblem(solver: ProblemSolver<never>, app: Application): Promise<void> {
        this.problem.reset();
        this.problem.getStats().subscribe(app);

        return this.problem.solve(solver);
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
