import Problem from '../problems/Problem';
import ProblemDisplay from './components/ProblemDisplay';
import ProblemSolver from '../problems/ProblemSolver';
import Controller from './Controller';
import SelectComponent from './components/SelectComponent';
import SolverDisplay from './components/SolverDisplay';
import SuccessMessage from './components/SuccessMessage';
import ErrorMessage from './components/ErrorMessage';
import StatsComponent from './components/StatsComponent';
import { Configuration } from './Configuration';

/**
 * @class Application
 *
 * handles the user interactions and sends the required actions to the controller.
 */
export default class Application {
    /* eslint-disable  */
    private readonly problemSelectElement = new SelectComponent<ProblemDisplay<Problem<never>, ProblemSolver<never, any, any>>>("problemSelect");
    private readonly algorithmSelectElement = new SelectComponent<SolverDisplay<ProblemSolver<never, any, any>>>("algorithmSelect");
    private readonly animationSpeedSelect: HTMLInputElement = <HTMLInputElement>(document.getElementById("animationSpeedSelect"));
    private readonly animationSpeedOutput: HTMLOutputElement = <HTMLOutputElement>(document.getElementById("animationSpeedOutput"));
    private readonly solveBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("solveBtn");
    private readonly generateBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("generateBtn");
    private readonly resetBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("resetBtn");
    /* eslint-enable */

    private readonly statsComponent = new StatsComponent();

    constructor(private readonly controller: Controller, private readonly config: Configuration) {
        this.initialize();

        this.problemSelectElement.onUpdate((problem) => this.onProblemSelectUpdate(problem));
        this.algorithmSelectElement.onUpdate(() => this.onAlgorithmSelectUpdate());
        this.animationSpeedSelect.oninput = () => this.onAnimationSpeedSelectInput();
        this.solveBtn.onclick = () => this.onSolveBtnClick();
        this.generateBtn.onclick = () => this.onGenerateBtnClick();
        this.resetBtn.onclick = () => this.onResetBtnClick();

        this.initializeValues();
    }

    private initializeValues() {
        this.setProblems(this.controller.getProblems());
        this.onAnimationSpeedSelectInput();
    }

    private onAlgorithmSelectUpdate() {
        this.controller.resetProblem();
    }

    private onResetBtnClick() {
        this.controller.resetProblem();
    }

    private onGenerateBtnClick() {
        this.controller.generateProblem();
    }

    private onSolveBtnClick() {
        const solver = this.algorithmSelectElement.getSelectedItem();
        if (!solver) {
            this.showErrorMessage('No Algorithm selected');
        } else {
            this.disableAllInputs();
            this.controller
                .solveProblem(solver.getSolver(), this.statsComponent)
                .then(() => {
                    this.showSuccessMessage();
                })
                .catch((error) => {
                    console.error(error);
                    this.showErrorMessage(error);
                })
                .finally(() => {
                    this.enableAllInputs();
                });
        }
    }

    private onAnimationSpeedSelectInput() {
        let animationSpeed = this.animationSpeedSelect.valueAsNumber;
        if (animationSpeed < 1) {
            animationSpeed = 1;
        }
        if (animationSpeed > 100) {
            animationSpeed = 100;
        }
        this.controller.setAnimationSpeed(animationSpeed);
        this.animationSpeedOutput.value = '' + animationSpeed;
        this.animationSpeedSelect.valueAsNumber = animationSpeed;
    }

    private onProblemSelectUpdate(
        problemDisplay: ProblemDisplay<Problem<never>, ProblemSolver<never, unknown, unknown>> | undefined,
    ) {
        if (!problemDisplay) {
            this.showErrorMessage('No Problem selected!');
        } else {
            this.controller.setProblem(problemDisplay);
            this.setSolvers(problemDisplay.getSolvers());
            this.controller.generateProblem();
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

    private setProblems(problems: ProblemDisplay<Problem<never>, ProblemSolver<never, unknown, unknown>>[]): void {
        problems.forEach((problem) => this.problemSelectElement.addItem(problem));
        this.onProblemSelectUpdate(problems[0]);
    }

    private setSolvers(solvers: SolverDisplay<ProblemSolver<never, unknown, unknown>>[]) {
        this.algorithmSelectElement.empty();
        solvers.forEach((s) => this.algorithmSelectElement.addItem(s));
    }

    private showErrorMessage(message: string): void {
        const errorMessage = new ErrorMessage(message);
        errorMessage.displayWithFading(5000);
    }

    private showSuccessMessage(): void {
        const successMessage = new SuccessMessage('Problem solved');
        successMessage.displayWithFading(3000);
    }

    private initialize() {
        const matcher = new RegExp('{{([ ]*)([a-zA-Z]+)([ ]*)}}', 'gm');
        const elements = document.querySelectorAll('html');
        console.log(elements);

        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = elements[i].innerHTML.replace(/{{([ ]*)([a-zA-Z]+)([ ]*)}}/gm, (string, p1, p2) =>
                this.config.getString(p2),
            );
        }
    }
}
