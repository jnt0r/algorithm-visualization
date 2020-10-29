import Renderer from '../display/Renderer';

export interface Problem {
    getAlgorithms(): string[];

    generate(): void;

    solve(renderer: Renderer): Promise<void>;

    render(renderer: Renderer): void;
}
