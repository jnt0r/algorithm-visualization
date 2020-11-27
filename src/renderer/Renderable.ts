import Renderer from './Renderer';

export default interface Renderable {
    render(renderer: Renderer): void;
}
