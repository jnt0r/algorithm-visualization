import Renderer from '../renderer/Renderer';
import SortingProblem from '../problems/sorting/SortingProblem';
import PathFindingProblem from '../problems/pathfinding/PathFindingProblem';
import Problem from '../problems/Problem';
import SelectionSort from '../problems/sorting/solver/SelectionSort';
import SelectComponent from './SelectComponent';
import SolverDisplay from './SolverDisplay';
import ProblemDisplay from './ProblemDisplay';
import Dijkstra from '../problems/pathfinding/solver/Dijkstra';
import AStar from '../problems/pathfinding/solver/AStar';
import ProblemSolver from '../problems/ProblemSolver';
import BubbleSort from '../problems/sorting/solver/BubbleSort';
import PathFindingProblemSolver from '../problems/pathfinding/PathFindingProblemSolver';
import SortingProblemSolver from '../problems/sorting/SortingProblemSolver';

export default class Application {
    private readonly renderer: Renderer = new Renderer();
    private problem!: Problem<never>;

    private readonly problemSelectElement = new SelectComponent<ProblemDisplay<Problem<never>, ProblemSolver<never>>>(
        'problemSelect',
    );
    private readonly algorithmSelectElement = new SelectComponent<SolverDisplay<ProblemSolver<never>>>(
        'algorithmSelect',
    );
    private readonly solveBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('solveBtn');
    private readonly generateBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('generateBtn');
    private readonly resetBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('resetBtn');

    constructor() {
        this.problemSelectElement.addItem(
            new ProblemDisplay<SortingProblem, SortingProblemSolver>('Sorting', new SortingProblem(), [
                new SolverDisplay('Bubblesort', new BubbleSort()),
                new SolverDisplay('Selectionsort', new SelectionSort()),
            ]),
        );

        this.problemSelectElement.addItem(
            new ProblemDisplay<PathFindingProblem, PathFindingProblemSolver>('Pathfinding', new PathFindingProblem(), [
                new SolverDisplay('Dijkstra', new Dijkstra()),
                new SolverDisplay('A*', new AStar()),
            ]),
        );

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

        this.algorithmSelectElement.onUpdate(() => this.resetProblem());

        this.solveBtn.onclick = () => {
            const solver = this.algorithmSelectElement.getSelectedItem();
            if (!solver) {
                this.showErrorMessage('No Algorithm selected');
            } else {
                this.problem.solve(this.renderer, solver.getSolver()).then(() => console.log('solved'));
            }
        };
        this.generateBtn.onclick = () => this.regenerateProblem();
        this.resetBtn.onclick = () => this.resetProblem();
    }

    private regenerateProblem(): void {
        this.problem.generate();
        this.problem.render(this.renderer);
    }

    private resetProblem() {
        this.problem.reset();
        this.problem.render(this.renderer);
    }

    private setProblem(problem: ProblemDisplay<Problem<never>, ProblemSolver<never>>): void {
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
