import Problem from '../problems/Problem';
import ProblemDisplay from './components/ProblemDisplay';
import ProblemSolver from '../problems/ProblemSolver';
import Controller from './Controller';
import SelectComponent from './components/SelectComponent';
import SolverDisplay from './components/SolverDisplay';
import SuccessMessage from './components/SuccessMessage';
import ErrorMessage from './components/ErrorMessage';
import StatsComponent from './components/StatsComponent';
import RangeComponent from './components/RangeComponent';

/**
 * @class Application
 *
 * handles the user interactions and sends the required actions to the controller.
 */
export default class Application {
    /* eslint-disable  */
    private readonly problemSelectElement = new SelectComponent<ProblemDisplay<Problem<never>, ProblemSolver<never, any, any>>>("problemSelect");
    private readonly algorithmSelectElement = new SelectComponent<SolverDisplay<ProblemSolver<never, any, any>>>("algorithmSelect");
    private readonly animationSpeedSelect = new RangeComponent("animationSpeed", 1, 100, 50);
    private readonly solveBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("solveBtn");
    private readonly generateBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("generateBtn");
    private readonly resetBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("resetBtn");
    /* eslint-enable */

    private readonly statsComponent = new StatsComponent();

    constructor(private readonly controller: Controller) {
        this.registerActions();
        this.initializeValues();
    }

    private registerActions() {
        this.problemSelectElement.onUpdate(problem => this.onProblemSelectUpdate(problem));
        this.algorithmSelectElement.onUpdate(() => this.onAlgorithmSelectUpdate());
        this.animationSpeedSelect.onUpdate(animationSpeed => this.updateAnimationSpeed(animationSpeed));
        this.solveBtn.onclick = () => this.onSolveBtnClick();
        this.generateBtn.onclick = () => this.onGenerateBtnClick();
        this.resetBtn.onclick = () => this.onResetBtnClick();
    }

    private initializeValues() {
        this.setProblems(this.controller.getProblems());
        this.updateAnimationSpeed(this.animationSpeedSelect.getValue());
    }

    private onAlgorithmSelectUpdate() {
        this.controller.resetProblem();
    }

    private onResetBtnClick() {
        this.controller.resetProblem();
    }

    private onGenerateBtnClick() {
        this.controller.generateProblem();
        this.statsComponent.reset();
    }

    private onSolveBtnClick() {
        const solver = this.algorithmSelectElement.getSelectedItem();
        if (!solver) {
            this.showErrorMessage('No Algorithm selected');
        } else {
            this.disableAllInputs();
            this.statsComponent.createNewStatForAlgorithm(solver.toString());
            this.controller
                .solveProblem(solver.getSolver(), this.statsComponent)
                .then(() => {
                    this.showSuccessMessage();
                })
                .catch(error => {
                    console.error(error);
                    this.showErrorMessage(error);
                })
                .finally(() => {
                    this.enableAllInputs();
                });
        }
    }

    private updateAnimationSpeed(animationSpeed: number) {
        this.controller.setAnimationSpeed(animationSpeed);
    }

    private onProblemSelectUpdate(
        problemDisplay: ProblemDisplay<Problem<never>, ProblemSolver<never, unknown, unknown>> | undefined,
    ) {
        if (!problemDisplay) {
            this.showErrorMessage('No Problem selected!');
        } else {
            this.statsComponent.reset();
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
        problems.forEach(problem => this.problemSelectElement.addItem(problem));
        this.onProblemSelectUpdate(problems[0]);
    }

    private setSolvers(solvers: SolverDisplay<ProblemSolver<never, unknown, unknown>>[]) {
        this.algorithmSelectElement.clear();
        solvers.forEach(s => this.algorithmSelectElement.addItem(s));
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
