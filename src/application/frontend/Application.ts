import Problem from '../../domain/problems/Problem';
import ProblemDisplay from './components/ProblemDisplay';
import ProblemSolver from '../../domain/problems/ProblemSolver';
import Controller from './Controller';
import SelectComponent from './components/SelectComponent';
import SolverDisplay from './components/SolverDisplay';
import SuccessMessage from './components/SuccessMessage';
import ErrorMessage from './components/ErrorMessage';
import StatsComponent from './components/StatsComponent';
import RangeComponent from './components/RangeComponent';
import ButtonComponent from './components/ButtonComponent';
import HtmlComponent from './components/HtmlComponent';

/**
 * @class Application
 *
 * handles the user interactions and sends the required actions to the controller.
 */
export default class Application {
    private readonly problemSelectElement = new SelectComponent<ProblemDisplay<Problem<never>, ProblemSolver<never, any, any>>>('problemSelect');
    private readonly algorithmSelectElement = new SelectComponent<SolverDisplay<ProblemSolver<never, any, any>>>('algorithmSelect');
    private readonly animationSpeedSelect = new RangeComponent('animationSpeed', 1, 100, 50);
    private readonly solveBtn = new ButtonComponent('solveBtn');
    private readonly generateBtn = new ButtonComponent('generateBtn');
    private readonly resetBtn = new ButtonComponent('resetBtn');

    private readonly statsComponent = new StatsComponent();
    // We only need the methods of the HtmlComponent class so any is okay here to group different Component types.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private readonly disablingElements: HtmlComponent<any>[] = [];

    constructor(private readonly controller: Controller) {
        this.registerActions();
        this.initializeValues();

        this.disablingElements.push(
            this.problemSelectElement,
            this.algorithmSelectElement,
            this.solveBtn,
            this.generateBtn,
            this.resetBtn,
        );
    }

    /**
     * Registers the action for each input element that should be executed when the user interacts with the element.
     * @private
     */
    private registerActions() {
        this.problemSelectElement.onUpdate(problem => this.onProblemSelectUpdate(problem));
        this.algorithmSelectElement.onUpdate(() => this.onAlgorithmSelectUpdate());
        this.animationSpeedSelect.onUpdate(animationSpeed => this.updateAnimationSpeed(animationSpeed));
        this.solveBtn.onClick(() => this.onSolveBtnClick());
        this.generateBtn.onClick(() => this.onGenerateBtnClick());
        this.resetBtn.onClick(() => this.onResetBtnClick());
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
            this.disableInputs();
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
                    this.enableInputs();
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

    private disableInputs(): void {
        this.disablingElements.forEach(element => element.disable());
    }

    private enableInputs(): void {
        this.disablingElements.forEach(element => element.enable());
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
