import Renderer from '../renderer/Renderer';
import SortingProblem from '../problems/sorting/SortingProblem';
import PathFindingProblem from '../problems/pathfinding/PathFindingProblem';
import Problem from '../problems/Problem';
import BubbleSort from '../problems/sorting/solver/BubbleSort';
import SelectionSort from '../problems/sorting/solver/SelectionSort';
import SelectComponent from './SelectComponent';
import SolverDisplay from './SolverDisplay';
import ProblemDisplay from './ProblemDisplay';

export default class Application {
    private readonly renderer: Renderer = new Renderer();

    private problem!: Problem;

    private readonly problemSelectElement = new SelectComponent<ProblemDisplay>('problemSelect');
    private readonly algorithmSelectElement = new SelectComponent<SolverDisplay>('algorithmSelect');

    private readonly solveBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('solveBtn');
    private readonly generateBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('generateBtn');

    constructor() {
        this.problemSelectElement.addItem(
            new ProblemDisplay('Sorting', new SortingProblem(), [
                new SolverDisplay('Bubblesort', new BubbleSort()),
                new SolverDisplay('Selectionsort', new SelectionSort()),
            ]),
        );

        this.problemSelectElement.addItem(new ProblemDisplay('Pathfinding', new PathFindingProblem(), []));

        this.setProblem(this.problemSelectElement.getSelectedItem());
    }

    run(): void {
        this.problemSelectElement.onUpdate((problem) => {
            if (!problem) {
                this.showErrorMessage('No Problem selected!');
            } else {
                this.setProblem(problem);
            }
        });

        this.solveBtn.onclick = () => {
            const solver = this.algorithmSelectElement.getSelectedItem();
            if (!solver) {
                this.showErrorMessage('No Algorithm selected');
            } else {
                this.problem.solve(this.renderer, solver.getSolver()).then(() => console.log('solved'));
            }
        };
        this.generateBtn.onclick = () => this.regenerateProblem();
    }

    private regenerateProblem(): void {
        this.problem.generate();
        this.problem.render(this.renderer);
    }

    private setProblem(problem: ProblemDisplay): void {
        this.problem = problem.getProblem();

        this.algorithmSelectElement.empty();
        problem.getSolvers().forEach((s) => this.algorithmSelectElement.addItem(s));

        this.regenerateProblem();
    }

    private showErrorMessage(message: string) {
        console.log(message);
        alert(message);
    }
}
