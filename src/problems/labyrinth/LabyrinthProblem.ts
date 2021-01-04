import Problem from '../Problem';
import PathFindingProblem from '../pathfinding/PathFindingProblem';
import GridBox from '../pathfinding/GridBox';

export default class LabyrinthProblem extends PathFindingProblem implements Problem<LabyrinthProblem> {
    generate(): void {
        super.generate();

        // for (let x = 0; x < this.grid.width; x++) {
        //     for (let y = 0; y < this.grid.height; y++) {
        //         this.grid.getElement(x, y)!.setWall();
        //     }
        // }

        const sets: GridBox[][] = [];
        const borders: { box: GridBox; index1: number; index2: number }[] = [];

        for (let x = 0; x < this.grid.width; x++) {
            for (let y = 0; y < this.grid.height; y++) {
                const gridBox = this.grid.getElement(x, y)!;
                gridBox.setWall();
                if (x % 2 === 0 && y % 2 === 0) {
                    gridBox.removeWall();
                    sets.push([gridBox]);
                }
                if (x % 2 === 0 && y % 2 != 0) {
                    borders.push({
                        box: gridBox,
                        index1: Math.floor(x * this.grid.height - 1),
                        index2: Math.floor(x * this.grid.height + 1),
                    });
                }
                if (x % 2 != 0 && y % 2 === 0) {
                    borders.push({
                        box: gridBox,
                        index1: Math.floor((x - 1) * this.grid.height + y),
                        index2: Math.floor((x + 1) * this.grid.height + y),
                    });
                }
            }
        }

        // console.log(sets);
        // console.log(borders);
        //
        for (let i = 0; i < sets.length; i++) {
            const index = Math.floor(Math.random() * (borders.length - 1));
            const current = borders.splice(index, 1)[0];
            current.box.removeWall();
            console.log(current);
            if (sets[current.index1] && sets[current.index2]) {
                // const temp = sets[current.index1];
                sets[current.index1] = sets[current.index1].concat(sets[current.index2]);
                sets[current.index2] = sets[current.index2].concat(sets[current.index1]);
            }
        }
        console.log(sets);
        // }
        //}
    }
}
