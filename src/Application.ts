import Renderer from './display/Renderer';

export default class Application {
    private readonly renderer;

    constructor() {
        this.renderer = new Renderer();
    }

    run(): void {
        console.log('Hello World');
        this.renderer.render();
    }
}
