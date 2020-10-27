import Renderer from './display/Renderer';
import SortingProblem from './problems/SortingProblem';

export default class Application {
    private readonly renderer;
    private readonly problem = new SortingProblem();

    constructor() {
        this.renderer = new Renderer();
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
