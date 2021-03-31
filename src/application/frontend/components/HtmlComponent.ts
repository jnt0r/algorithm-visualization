export default class HtmlComponent<T extends HTMLElement> {
    protected readonly element: T;

    constructor(private readonly elementId: string) {
        this.element = <T>document.getElementById(elementId);

        if (!this.element) {
            throw new Error(`IllegalArgumentError: Element with id '${elementId}' does not exist.`);
        }
    }
}
