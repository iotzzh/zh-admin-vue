export class ZHModal {
    emit: any;
    modal: any;
    constructor(params: any) {
        this.modal = params.modal;
        this.emit = params.emit;
    }

    close = () => {
        this.emit('close');
    };

    submit = () => {
        this.emit('submit');
    };

    cancel = () => {
        this.emit('cancel');
    };
}