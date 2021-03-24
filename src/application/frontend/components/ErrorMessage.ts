import Message from './Message';

export default class ErrorMessage extends Message {
    constructor(private readonly errorMessage: string) {
        super(errorMessage);

        this.addClassName('error');
    }
}
