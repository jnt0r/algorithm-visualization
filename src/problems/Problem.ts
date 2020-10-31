import Renderer from '../display/Renderer';

export default interface Problem {
    getAlgorithms(): string[];

    generate(): void;

    solve(renderer: Renderer): Promise<void>;

    render(renderer: Renderer): void;
}
