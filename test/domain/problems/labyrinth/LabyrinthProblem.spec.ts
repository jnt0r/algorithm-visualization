import LabyrinthProblem from '../../../../src/domain/problems/labyrinth/LabyrinthProblem';
import { TestRenderer } from '../../../TestRenderer';
import Problem from '../../../../src/domain/problems/Problem';
import ProblemSolver from '../../../../src/domain/problems/ProblemSolver';
import Grid from '../../../../src/domain/problems/pathfinding/Grid';
import Path from '../../../../src/domain/problems/pathfinding/Path';
import GridBox from '../../../../src/domain/problems/pathfinding/GridBox';
import Queue from '../../../../src/utils/Queue';

describe('LabyrinthProblem', () => {
    test('All non wall elements should be connected in generated maze', async () => {
        const grid = await generateGridWithMaze();
        const allNonWallElements = getAllNonWallElements(grid);

        const reachedElements = calculateAllElementsReachedFromFirstNonWallElement(allNonWallElements, grid);

        expect(reachedElements.size).toBe(allNonWallElements.length);
    });
});

function calculateAllElementsReachedFromFirstNonWallElement(allNonWallElements: any[], grid: Grid) {
    function traverse(element: GridBox) {
        reachedElements.add(element);
        for (const value of grid.getNeighboursOfElement(element)) {
            if (!reachedElements.has(value)) {
                queue.push(value);
            }
        }
    }

    const reachedElements = new Set<GridBox>();
    const queue = new Queue<GridBox>();

    queue.push(allNonWallElements[0]);

    while (!queue.isEmpty()) {
        traverse(queue.pop()!);
    }

    return reachedElements;
}

function getAllNonWallElements(grid: Grid) {
    const allNonWallElements = [];

    for (let i = 0; i < grid.width; i++) {
        for (let j = 0; j < grid.height; j++) {
            const element = grid.getElement(i, j)!;
            if (!element.isWall()) {
                allNonWallElements.push(element);
            }
        }
    }

    return allNonWallElements;
}

async function generateGridWithMaze() {
    let grid!: Grid;

    const problem: Problem<LabyrinthProblem> = new LabyrinthProblem(new TestRenderer());
    problem.generate();
    await problem.solve(new class implements ProblemSolver<LabyrinthProblem, unknown, unknown> {
        async solve(data: Grid): Promise<Path> {
            grid = data;

            return new Path();
        }
    });

    return grid;
}
