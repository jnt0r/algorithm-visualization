import Renderer from '../renderer/Renderer';

export default class MustInitializeWithRenderer {
    public constructor(protected readonly renderer: Renderer) {}
}
