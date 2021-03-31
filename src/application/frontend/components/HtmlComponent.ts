export default abstract class HtmlComponent<T extends HTMLElement> {
    protected readonly element: T;

    protected constructor(private readonly elementId: string) {
        this.element = <T>document.getElementById(elementId);

        if (!this.element) {
            throw new Error(`IllegalArgumentError: Element with id '${elementId}' does not exist.`);
        }
    }

    /**
     * HTMLElement class does not provide same disabling feature for all elements.
     * So each element has to implement it by itself.
     */
    abstract disable(): void;

    abstract enable(): void;
}
