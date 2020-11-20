import Renderer, { SVGRenderer } from '../renderer/Renderer';
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
import QuickSort from '../problems/sorting/solver/QuickSort';

export default class Application {
    private readonly renderer: Renderer = new SVGRenderer();
    private problem!: Problem<never>;

    private readonly problemSelectElement = new SelectComponent<ProblemDisplay<Problem<never>, ProblemSolver<never>>>(
        'problemSelect',
    );

    private readonly algorithmSelectElement = new SelectComponent<SolverDisplay<ProblemSolver<never>>>(
        'algorithmSelect',
    );

    private readonly animationSpeedSelect: HTMLInputElement = <HTMLInputElement>(
        document.getElementById('animationSpeedSelect')
    );

    private readonly animationSpeedOutput: HTMLOutputElement = <HTMLOutputElement>(
        document.getElementById('animationSpeedOutput')
    );

    private readonly solveBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('solveBtn');
    private readonly generateBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('generateBtn');
    private readonly resetBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('resetBtn');

    constructor() {
        this.problemSelectElement.addItem(
            new ProblemDisplay<SortingProblem, SortingProblemSolver>('Sorting', SortingProblem, [
                new SolverDisplay('Bubblesort', BubbleSort),
                new SolverDisplay('Selectionsort', SelectionSort),
                new SolverDisplay('QuickSort', QuickSort),
            ]),
        );

        this.problemSelectElement.addItem(
            new ProblemDisplay<PathFindingProblem, PathFindingProblemSolver>('Pathfinding', PathFindingProblem, [
                new SolverDisplay('Dijkstra', Dijkstra),
                new SolverDisplay('A*', AStar),
            ]),
        );

        this.setProblem(this.problemSelectElement.getSelectedItem());
        this.setAnimationSpeed(300);
    }

    run(): void {
        this.problemSelectElement.onUpdate((problem) => this.onProblemSelectChange(problem));
        this.algorithmSelectElement.onUpdate(() => this.resetProblem());
        this.animationSpeedSelect.oninput = () => this.setAnimationSpeed(this.animationSpeedSelect.valueAsNumber);
        this.solveBtn.onclick = () => this.onSolveBtnClick();
        this.generateBtn.onclick = () => this.regenerateProblem();
        this.resetBtn.onclick = () => this.resetProblem();
    }

    private onProblemSelectChange(problem: ProblemDisplay<Problem<never>, ProblemSolver<never>> | undefined) {
        if (!problem) {
            this.showErrorMessage('No Problem selected!');
        } else {
            this.setProblem(problem);
        }
    }

    private onSolveBtnClick() {
        const solver = this.algorithmSelectElement.getSelectedItem();
        if (!solver) {
            this.showErrorMessage('No Algorithm selected');
        } else {
            this.problem
                .solve(this.renderer, solver.getSolver())
                .then(() => console.log('solved'))
                .catch((error) => this.showErrorMessage(error));
        }
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

    private showErrorMessage(message: string): void {
        console.log(message);
        alert(message);
    }

    private setAnimationSpeed(animationSpeed: number): void {
        this.renderer.setAnimationSpeed(animationSpeed);
        this.animationSpeedOutput.value = '' + animationSpeed;
        this.animationSpeedSelect.valueAsNumber = animationSpeed;
    }
}
