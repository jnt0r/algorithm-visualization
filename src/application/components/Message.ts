export default class Message {
    private readonly wrapperElement: HTMLDivElement;
    private readonly messageElement: HTMLParagraphElement;

    constructor(private readonly messageString: string) {
        this.wrapperElement = document.createElement('div');
        this.messageElement = document.createElement('p');

        this.addClassName('message-wrapper');
        this.addClassName('hidden');
        this.messageElement.innerText = messageString;
    }

    addClassName(className: string): void {
        this.wrapperElement.classList.add(className);
    }

    display(): void {
        document.body.appendChild(this.wrapperElement);
        this.wrapperElement.appendChild(this.messageElement);

        // Small timeout needed to trigger transition in some browsers
        setTimeout(() => {
            this.wrapperElement.classList.remove('hidden');
        }, 10);
    }

    remove(): void {
        this.wrapperElement.classList.add('hidden');
        setTimeout(() => {
            document.body.removeChild(this.wrapperElement);
        }, 500);
    }
}
