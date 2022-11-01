import { ref } from "vue";

export class ZHModal {
    emit: any;
    modal: any;
    constructor(params: any) {
        this.modal = params.modal;
        this.emit = params.emit;
    }

    loadingSubmit = ref(false);

    toggleLodadingSubmit = (isLoading: boolean) => {
        this.loadingSubmit.value = isLoading;
    };

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