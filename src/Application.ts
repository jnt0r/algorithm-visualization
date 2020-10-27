import Renderer from './display/Renderer';
import SortingProblem from './problems/SortingProblem';
import PathFindingProblem from './problems/PathFindingProblem';

export default class Application {
    private readonly renderer;
    private readonly problem;

    constructor() {
        this.renderer = new Renderer();
        this.problem = new PathFindingProblem(this.renderer);
    }

    run(): void {
        this.problem.render(this.renderer);

        document.getElementById('solveBtn')!.onclick = () => {
            this.problem.solve(this.renderer).then(() => console.log('solved'));
        };

        document.getElementById('generateBtn')!.onclick = () => {
            this.problem.generate();
            this.problem.render(this.renderer);
        };
    }
}
