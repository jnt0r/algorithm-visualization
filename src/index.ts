import Application from './application/Application';
import CanvasRenderer from './application/renderer/canvasrenderer/CanvasRenderer';
import Controller from './application/Controller';
import ProblemDisplay from './application/components/ProblemDisplay';
import SortingProblem from './problems/sorting/SortingProblem';
import SortingProblemSolver from './problems/sorting/SortingProblemSolver';
import SolverDisplay from './application/components/SolverDisplay';
import BubbleSort from './problems/sorting/solver/BubbleSort';
import SelectionSort from './problems/sorting/solver/SelectionSort';
import QuickSort from './problems/sorting/solver/QuickSort';
import PathFindingProblem from './problems/pathfinding/PathFindingProblem';
import PathFindingProblemSolver from './problems/pathfinding/PathFindingProblemSolver';
import Dijkstra from './problems/pathfinding/solver/Dijkstra';
import AStar from './problems/pathfinding/solver/AStar';
import LabyrinthProblem from './problems/labyrinth/LabyrinthProblem';
import EnglishConfiguration from './application/Configuration';
import BreadthFirstSearch from './problems/pathfinding/solver/BreadthFirstSearch';
import DepthFirstSearch from './problems/pathfinding/solver/DepthFirstSearch';

const renderer = new CanvasRenderer();
const availableProblems = [
    new ProblemDisplay<SortingProblem, SortingProblemSolver>('Sorting', SortingProblem, [
        new SolverDisplay('Bubblesort', BubbleSort),
        new SolverDisplay('Selectionsort', SelectionSort),
        new SolverDisplay('QuickSort', QuickSort),
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
new Application(controller, new EnglishConfiguration());
