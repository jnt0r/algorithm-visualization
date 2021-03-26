import Application from './application/frontend/Application';
import CanvasRenderer from './application/renderer/canvasrenderer/CanvasRenderer';
import Controller from './application/frontend/Controller';
import ProblemDisplay from './application/frontend/components/ProblemDisplay';
import SortingProblem from './domain/problems/sorting/SortingProblem';
import SortingProblemSolver from './domain/problems/sorting/SortingProblemSolver';
import SolverDisplay from './application/frontend/components/SolverDisplay';
import BubbleSort from './application/solvers/solver/BubbleSort';
import SelectionSort from './application/solvers/solver/SelectionSort';
import QuickSort from './application/solvers/solver/QuickSort';
import PathFindingProblem from './domain/problems/pathfinding/PathFindingProblem';
import PathFindingProblemSolver from './domain/problems/pathfinding/PathFindingProblemSolver';
import Dijkstra from './application/solvers/pathfinding/Dijkstra';
import AStar from './application/solvers/pathfinding/AStar';
import LabyrinthProblem from './domain/problems/labyrinth/LabyrinthProblem';
import BreadthFirstSearch from './application/solvers/pathfinding/BreadthFirstSearch';
import DepthFirstSearch from './application/solvers/pathfinding/DepthFirstSearch';

const renderer = new CanvasRenderer('renderer-wrapper');
const availableProblems = [
    new ProblemDisplay<SortingProblem, SortingProblemSolver>('Sorting', SortingProblem, [
        new SolverDisplay('Bubblesort', BubbleSort),
        new SolverDisplay('Selectionsort', SelectionSort),
        new SolverDisplay('Quicksort', QuickSort),
    ]),
    new ProblemDisplay<PathFindingProblem, PathFindingProblemSolver>('Pathfinding', PathFindingProblem, [
        new SolverDisplay('Dijkstra', Dijkstra),
        new SolverDisplay('Breadth First', BreadthFirstSearch),
        new SolverDisplay('Depth First', DepthFirstSearch),
        new SolverDisplay('A*', AStar),
    ]),
    new ProblemDisplay<LabyrinthProblem, PathFindingProblemSolver>('Labyrinth', LabyrinthProblem, [
        new SolverDisplay('Dijkstra', Dijkstra),
        new SolverDisplay('Breadth First', BreadthFirstSearch),
        new SolverDisplay('Depth First', DepthFirstSearch),
        new SolverDisplay('A*', AStar),
    ]),
];
const controller = new Controller(renderer, availableProblems);
new Application(controller);
