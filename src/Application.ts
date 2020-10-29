import Renderer from './display/Renderer';
import SortingProblem from './problems/sorting/SortingProblem';
import PathFindingProblem from './problems/pathfinding/PathFindingProblem';
import Problem from './problems/Problem';

export default class Application {
    private readonly renderer;
    private readonly problems: Record<string, { new (): Problem }> = {};
    private problem: Problem;

    private readonly problemSelect: HTMLSelectElement = <HTMLSelectElement>document.getElementById('problemSelect');
    private readonly algorithmSelect: HTMLSelectElement = <HTMLSelectElement>document.getElementById('algorithmSelect');

    constructor() {
        this.renderer = new Renderer();

        // Adding Problems to be able to choose from
        this.problems['Sorting'] = SortingProblem;
        this.problems['Path-finding'] = PathFindingProblem;

        // Set default problem to 'Sorting'
        this.setProblem('Sorting');
    }

    run(): void {
        // this.problem.render(this.renderer);

        for (const p in this.problems) {
            this.problemSelect.appendChild(new Option(p, p));
        }
        this.problemSelect.onchange = () => {
            this.setProblem(this.problemSelect.value);
        };

        document.getElementById('solveBtn')!.onclick = () => {
            this.problem.solve(this.renderer).then(() => console.log('solved'));
        };

        document.getElementById('generateBtn')!.onclick = () => {
            this.problem.generate();
            this.problem.render(this.renderer);
        };
    }

    private setProblem(problem: string) {
        this.problem = new this.problems[problem]();

        this.clearAlgorithmSelectField();
        this.fillAlgorithmSelectField();

        this.problem.generate();
        this.problem.render(this.renderer);
    }

    private fillAlgorithmSelectField() {
        this.problem.getAlgorithms().forEach((v) => {
            this.algorithmSelect.appendChild(new Option(v, v));
        });
    }

    private clearAlgorithmSelectField() {
        this.algorithmSelect.options.length = 0;
        // for (let i = 0; i <= this.algorithmSelect.options.length; i++) {
        //     this.algorithmSelect.options.remove(i);
        // }
        // this.algorithmSelect.remove(this.algorithmSelect.selectedIndex);
    }
}
