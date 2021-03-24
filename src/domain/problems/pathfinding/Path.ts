import GridBox from './GridBox';

export default class Path {
    private readonly path: GridBox[] = [];

    addPartOfPath(box: GridBox): void {
        this.path.push(box);
    }

    getPath(): GridBox[] {
        return this.path;
    }
}
