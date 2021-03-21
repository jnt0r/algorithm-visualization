import Renderer from '../renderer/api/Renderer';

export default class MustInitializeWithRenderer {
    public constructor(protected readonly renderer: Renderer) {}
}
