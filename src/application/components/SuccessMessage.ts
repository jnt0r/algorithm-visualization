import Message from './Message';

export default class SuccessMessage extends Message {
    constructor() {
        super('Problem solved');

        this.addClassName('success');
    }
}
