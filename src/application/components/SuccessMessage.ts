import Message from './Message';

export default class SuccessMessage extends Message {
    constructor(message: string) {
        super(message);

        this.addClassName('success');
    }
}
