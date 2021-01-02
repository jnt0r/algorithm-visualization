import Problem from '../problems/Problem';
import ProblemDisplay from './components/ProblemDisplay';
import ProblemSolver from '../problems/ProblemSolver';
import Renderer from '../renderer/Renderer';
import SVGRenderer from './svgrenderer/SVGRenderer';
import Controller from './Controller';
import Configuration from './Configuration';
import SelectComponent from './components/SelectComponent';
import SolverDisplay from './components/SolverDisplay';
import ProblemStats from '../problems/ProblemStats';

/**
 * @class Application
 *
 * handles the user interactions and sends the required actions to the controller.
 */
export default class Application {
    private readonly renderer: Renderer = new SVGRenderer();

    /* eslint-disable  */
    private readonly problemSelectElement = new SelectComponent<ProblemDisplay<Problem<never>, ProblemSolver<never>>>('problemSelect');
    private readonly algorithmSelectElement = new SelectComponent<SolverDisplay<ProblemSolver<never>>>('algorithmSelect');
    private readonly animationSpeedSelect: HTMLInputElement = <HTMLInputElement>(document.getElementById('animationSpeedSelect'));
    private readonly animationSpeedOutput: HTMLOutputElement = <HTMLOutputElement>(document.getElementById('animationSpeedOutput'));
    private readonly solveBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('solveBtn');
    private readonly generateBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('generateBtn');
    private readonly resetBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('resetBtn');
    private readonly statsDiv: HTMLDivElement = <HTMLDivElement>document.getElementsByClassName('stats')[0];
    /* eslint-enable */

    private readonly controller: Controller;
    private readonly configuration: Configuration;

    constructor() {
        this.configuration = new Configuration();
        this.controller = new Controller(this.renderer);

        this.problemSelectElement.onUpdate((problem) => this.onProblemSelectUpdate(problem));
        this.algorithmSelectElement.onUpdate(() => this.onAlgorithmSelectUpdate());
        this.animationSpeedSelect.oninput = () => this.onAnimationSpeedSelectInput();
        this.solveBtn.onclick = () => this.onSolveBtnClick();
        this.generateBtn.onclick = () => this.onGenerateBtnClick();
        this.resetBtn.onclick = () => this.onResetBtnClick();

        // Initial values
        this.setProblems(this.configuration.getProblems());
        this.onAnimationSpeedSelectInput();
    }

    private onAlgorithmSelectUpdate() {
        this.controller.resetProblem();
    }

    private onResetBtnClick() {
        this.controller.resetProblem();
    }

    private onGenerateBtnClick() {
        this.controller.regenerateProblem();
    }

    private onSolveBtnClick() {
        const solver = this.algorithmSelectElement.getSelectedItem();
        if (!solver) {
            this.showErrorMessage('No Algorithm selected');
        } else {
            this.disableAllInputs();
            this.controller
                .solveProblem(solver.getSolver())
                .then((stats) => {
                    console.log('solved');
                    this.displayStats(stats);
                })
                .catch((error) => this.showErrorMessage(error))
                .finally(() => {
                    this.enableAllInputs();
                });
        }
    }

    private onAnimationSpeedSelectInput() {
        const animationSpeed = this.animationSpeedSelect.valueAsNumber;
        this.controller.setAnimationSpeed(1000 - 10 * animationSpeed);
        this.animationSpeedOutput.value = '' + animationSpeed;
        this.animationSpeedSelect.valueAsNumber = animationSpeed;
    }

    private onProblemSelectUpdate(problemDisplay: ProblemDisplay<Problem<never>, ProblemSolver<never>> | undefined) {
        if (!problemDisplay) {
            this.showErrorMessage('No Problem selected!');
        } else {
            const problem = problemDisplay.getProblem(this.renderer);

            this.controller.setProblem(problem);
            this.algorithmSelectElement.empty();
            problemDisplay.getSolvers().forEach((s) => this.algorithmSelectElement.addItem(s));
            this.controller.regenerateProblem();
            this.displayStats(problem.getStats());
        }
    }

    private disableAllInputs(): void {
        this.problemSelectElement.disable();
        this.algorithmSelectElement.disable();
        this.resetBtn.disabled = true;
        this.generateBtn.disabled = true;
        this.solveBtn.disabled = true;
    }

    private enableAllInputs(): void {
        this.problemSelectElement.enable();
        this.algorithmSelectElement.enable();
        this.resetBtn.disabled = false;
        this.generateBtn.disabled = false;
        this.solveBtn.disabled = false;
    }

    private setProblems(problems: ProblemDisplay<Problem<never>, ProblemSolver<never>>[]): void {
        problems.forEach((problem) => this.problemSelectElement.addItem(problem));
        this.onProblemSelectUpdate(problems[0]);
    }

    private showErrorMessage(message: string): void {
        console.log(message);
        alert(message);
    }

    private displayStats(stats: ProblemStats): void {
        this.statsDiv.innerHTML = '';
        stats.getStats().forEach((value, key) => {
            const span = document.createElement('span');
            span.innerHTML = `${key}: ${value}`;
            this.statsDiv.appendChild(span);
        });
    }
}
