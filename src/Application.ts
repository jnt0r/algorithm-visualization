import Renderer from './display/Renderer';
import SortingProblem from './problems/sorting/SortingProblem';
import PathFindingProblem from './problems/pathfinding/PathFindingProblem';
import Problem from './problems/Problem';
import BubbleSort from './problems/sorting/solver/BubbleSort';
import ProblemSolver from './problems/ProblemSolver';

export default class Application {
    private readonly renderer: Renderer = new Renderer();
    private readonly problems: Record<string, Problem> = {};
    private readonly algorithms: Record<string, ProblemSolver[]> = {};
    private problem!: Problem;

    private readonly problemSelect: HTMLSelectElement = <HTMLSelectElement>document.getElementById('problemSelect');
    private readonly algorithmSelect: HTMLSelectElement = <HTMLSelectElement>document.getElementById('algorithmSelect');
    private readonly solveBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('solveBtn');
    private readonly generateBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('generateBtn');

    constructor() {
        // Adding Problems to be able to choose from
        this.problems['Sorting'] = new SortingProblem();
        this.algorithms['Sorting'] = [new BubbleSort(), new SortingProblem()];
        this.problems['Path-finding'] = new PathFindingProblem();
        this.algorithms['Path-finding'] = [];

        // Set default problem to 'Sorting'
        this.setProblem('Path-finding');
    }

    run(): void {
        this.problems['Path-finding']
            .solve(this.renderer, new BubbleSort())
            .then(() => console.log('Solved'))
            .catch((reason) => console.log(reason));

        for (const p in this.problems) {
            this.problemSelect.appendChild(new Option(p, p));
        }
        this.problemSelect.onchange = () => this.setProblem(this.problemSelect.value);

        this.solveBtn.onclick = () => {
            // this.problem.solve(this.renderer, this.solver).then(() => console.log('solved'));
        };

        this.generateBtn.onclick = () => {
            this.regenerateProblem();
        };
    }

    private regenerateProblem() {
        this.problem.generate();
        this.problem.render(this.renderer);
    }

    private setProblem(problem: string) {
        this.problem = this.problems[problem];

        this.clearAlgorithmSelectField();
        this.fillAlgorithmSelectField();

        this.regenerateProblem();
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
