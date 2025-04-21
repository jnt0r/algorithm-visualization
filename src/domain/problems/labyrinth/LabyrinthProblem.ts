import PathFindingProblem from '../pathfinding/PathFindingProblem';
import GridBox from '../pathfinding/GridBox';

/**
 *  This problem is a variation of the PathFindingProblem. All solvers of the PathFindingProblem are usable with this problem as well.
 *  Only difference is the generation. Instead of generating an empty grid, this problem generates a unique solvable maze
 */
export default class LabyrinthProblem extends PathFindingProblem {
    private sets!: GridBox[][];
    private setsMap!: Map<number, number>;
    private borders!: { box: GridBox; firstSetIndex: number; secondSetIndex: number }[];

    /**
     * The generated maze always consist of one path that connects all non-wall elements.
     * Every non-wall element is always reachable from every other non-wall element.
     */
    generate(): void {
        super.generate();

        this.sets = [];
        this.setsMap = new Map();
        this.borders = [];

        this.generateMaze();
    }

    private generateMaze(): void {
        this.initializeSetsAndBorders();
        this.constructMaze();
    }

    private initializeSetsAndBorders(): void {
        this.forEachBoxInGrid((box, x, y) => {
            box.setWall();

            if (x % 2 === 0 && y % 2 === 0) {
                box.removeWall();
                this.sets.push([ box ]);
                this.setsMap.set(this.sets.length - 1, this.sets.length - 1);
            }
            if (x % 2 === 0 && y % 2 != 0) {
                this.borders.push({
                    box: box,
                    firstSetIndex: this.sets.length - 1,
                    secondSetIndex: this.sets.length,
                });
            }
            if (x % 2 != 0 && y % 2 === 0) {
                const dx = Math.ceil(this.grid.height / 2);
                const firstSetIndex = Math.floor(x / 2) * dx + Math.floor(y / 2);
                this.borders.push({
                    box: box,
                    firstSetIndex: firstSetIndex,
                    secondSetIndex: firstSetIndex + dx,
                });
            }
        });
    }

    private constructMaze(): void {
        while (this.sets[this.setsMap.get(0)!].length < this.sets.length) {
            const border = this.chooseRandomBorder();

            const firstSetIndex = this.setsMap.get(border.firstSetIndex)!;
            const secondSetIndex = this.setsMap.get(border.secondSetIndex)!;
            if (firstSetIndex !== secondSetIndex) {
                border.box.removeWall();

                const set1 = this.sets[firstSetIndex];
                const set2 = this.sets[secondSetIndex] || [];

                this.mergeSets(set1, set2);
                for (let i = 0; i < this.setsMap.size; i++) {
                    if (this.setsMap.get(i) === secondSetIndex) {
                        this.setsMap.set(i, firstSetIndex);
                    }
                }
            }
        }
    }

    private chooseRandomBorder() {
        const randomBorderIndex = Math.floor(Math.random() * (this.borders.length - 1));

        return this.borders.splice(randomBorderIndex, 1)[0];
    }

    /**
     * Adds elements of set2 to set1 that not exist in set1.
     *
     * @param set1
     * @param set2
     * @private
     */
    private mergeSets(set1: GridBox[], set2: GridBox[]): void {
        for (const a of set2) {
            if (set1.findIndex(v => v.point.getX() === a.point.getX() && v.point.getY() === a.point.getY()) === -1) {
                set1.push(a);
            }
        }
    }

    private forEachBoxInGrid(func: (box: GridBox, x: number, y: number) => void) {
        for (let x = 0; x < this.grid.width; x++) {
            for (let y = 0; y < this.grid.height; y++) {
                // We know the element at this position must exist so we can ignore the possible undefined

                const gridBox = this.grid.getElement(x, y)!;
                func(gridBox, x, y);
            }
        }
    }
}
