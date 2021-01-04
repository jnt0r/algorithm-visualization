import PathFindingProblem from '../pathfinding/PathFindingProblem';
import GridBox from '../pathfinding/GridBox';

/**
 *  This problem is a variation of the PathFindingProblem. All solvers of the PathFindingProblem are usable with this problem as well.
 *  Only difference is the generation. Instead of generating an empty grid, this problem generates a unique solvable maze
 */
export default class LabyrinthProblem extends PathFindingProblem {
    generate(): void {
        super.generate();

        // for (let x = 0; x < this.grid.width; x++) {
        //     for (let y = 0; y < this.grid.height; y++) {
        //         this.grid.getElement(x, y)!.setWall();
        //     }
        // }

        this.generateMaze();
    }

    private generateMaze(): void {
        const sets: GridBox[][] = [];
        const map: Map<number, number> = new Map();
        const borders: { box: GridBox; index1: number; index2: number }[] = [];

        for (let x = 0; x < this.grid.width; x++) {
            for (let y = 0; y < this.grid.height; y++) {
                // We know the element at this position must exist so we can ignore the possible return value of undefined
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const gridBox = this.grid.getElement(x, y)!;
                gridBox.setWall();

                if (x % 2 === 0 && y % 2 === 0) {
                    gridBox.removeWall();
                    sets.push([gridBox]);
                    map.set(sets.length - 1, sets.length - 1);
                }
                if (x % 2 === 0 && y % 2 != 0) {
                    borders.push({
                        box: gridBox,
                        index1: sets.length - 1,
                        index2: sets.length,
                    });
                }
                if (x % 2 != 0 && y % 2 === 0) {
                    const dx = Math.ceil(this.grid.height / 2);
                    const index1 = Math.floor(x / 2) * dx + Math.floor(y / 2);
                    borders.push({
                        box: gridBox,
                        index1: index1,
                        index2: index1 + dx,
                    });
                }
            }
        }

        while (sets[map.get(0)!].length < sets.length) {
            const index = Math.floor(Math.random() * (borders.length - 1));
            const current = borders.splice(index, 1)[0];

            const i1 = map.get(current.index1)!;
            const i2 = map.get(current.index2)!;
            if (i1 !== i2) {
                current.box.removeWall();
                const set1 = sets[i1];
                const set2 = sets[i2];
                this.merge(set1, set2);
                for (let i = 0; i < map.size; i++) {
                    if (map.get(i) === i2) {
                        map.set(i, i1);
                        // console.log('set', i, i1);
                    }
                }
            }
        }
    }

    private merge(a1: GridBox[], a2: GridBox[]): void {
        for (const a of a2) {
            if (a1.findIndex((v) => v.point.getX() === a.point.getX() && v.point.getY() === a.point.getY()) === -1) {
                a1.push(a);
            }
        }
    }
}
