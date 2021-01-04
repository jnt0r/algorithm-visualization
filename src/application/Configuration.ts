import ProblemDisplay from './components/ProblemDisplay';
import SortingProblem from '../problems/sorting/SortingProblem';
import SortingProblemSolver from '../problems/sorting/SortingProblemSolver';
import SolverDisplay from './components/SolverDisplay';
import BubbleSort from '../problems/sorting/solver/BubbleSort';
import SelectionSort from '../problems/sorting/solver/SelectionSort';
import QuickSort from '../problems/sorting/solver/QuickSort';
import Problem from '../problems/Problem';
import ProblemSolver from '../problems/ProblemSolver';
import PathFindingProblem from '../problems/pathfinding/PathFindingProblem';
import PathFindingProblemSolver from '../problems/pathfinding/PathFindingProblemSolver';
import Dijkstra from '../problems/pathfinding/solver/Dijkstra';
import AStar from '../problems/pathfinding/solver/AStar';
import LabyrinthProblem from '../problems/labyrinth/LabyrinthProblem';

export default class Configuration {
    getProblems(): ProblemDisplay<Problem<never>, ProblemSolver<never>>[] {
        return [
            new ProblemDisplay<SortingProblem, SortingProblemSolver>('Sorting', SortingProblem, [
                new SolverDisplay('Bubblesort', BubbleSort),
                new SolverDisplay('Selectionsort', SelectionSort),
                new SolverDisplay('QuickSort', QuickSort),
            ]),
            new ProblemDisplay<PathFindingProblem, PathFindingProblemSolver>('Pathfinding', PathFindingProblem, [
                new SolverDisplay('Dijkstra', Dijkstra),
                new SolverDisplay('A*', AStar),
            ]),
            new ProblemDisplay<LabyrinthProblem, PathFindingProblemSolver>('Labyrinth', LabyrinthProblem, [
                new SolverDisplay('Dijkstra', Dijkstra),
                new SolverDisplay('A*', AStar),
            ]),
        ];
    }
}
