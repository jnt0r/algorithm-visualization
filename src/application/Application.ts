import Problem from '../problems/Problem';
import ProblemDisplay from './components/ProblemDisplay';
import ProblemSolver from '../problems/ProblemSolver';
import Renderer from '../renderer/Renderer';
import Controller from './Controller';
import Configuration from './Configuration';
import SelectComponent from './components/SelectComponent';
import SolverDisplay from './components/SolverDisplay';
import SuccessMessage from './components/SuccessMessage';
import ErrorMessage from './components/ErrorMessage';
import StatsComponent from './components/StatsComponent';

/**
 * @class Application
 *
 * handles the user interactions and sends the required actions to the controller.
 */
export default class Application {
    /* eslint-disable  */
    private readonly problemSelectElement = new SelectComponent<ProblemDisplay<Problem<never>, ProblemSolver<never>>>("problemSelect");
    private readonly algorithmSelectElement = new SelectComponent<SolverDisplay<ProblemSolver<never>>>("algorithmSelect");
    private readonly animationSpeedSelect: HTMLInputElement = <HTMLInputElement>(document.getElementById("animationSpeedSelect"));
    private readonly animationSpeedOutput: HTMLOutputElement = <HTMLOutputElement>(document.getElementById("animationSpeedOutput"));
    private readonly solveBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("solveBtn");
    private readonly generateBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("generateBtn");
    private readonly resetBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("resetBtn");
    /* eslint-enable */

    private readonly statsComponent: StatsComponent;
    private readonly controller: Controller;
    private readonly configuration: Configuration;

    constructor(private readonly renderer: Renderer) {
        this.configuration = new Configuration();
        this.controller = new Controller(this.renderer);
        this.statsComponent = new StatsComponent();

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
                .catch((error) => this.showErrorMessage(error))
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

    private onProblemSelectUpdate(problemDisplay: ProblemDisplay<Problem<never>, ProblemSolver<never>> | undefined) {
        if (!problemDisplay) {
            this.showErrorMessage('No Problem selected!');
        } else {
            const problem = problemDisplay.getProblem(this.renderer);

            this.controller.setProblem(problem);
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

    private setProblems(problems: ProblemDisplay<Problem<never>, ProblemSolver<never>>[]): void {
        problems.forEach((problem) => this.problemSelectElement.addItem(problem));
        this.onProblemSelectUpdate(problems[0]);
    }

    private setSolvers(solvers: SolverDisplay<ProblemSolver<never>>[]) {
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
}
