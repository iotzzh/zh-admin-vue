import { Ref, ref } from "vue";

export class ZHModal {
    emit: any;
    modal: any;
    fullscreen: Ref<boolean>;
    constructor(params: any) {
        this.modal = params.modal;
        this.emit = params.emit;
        this.fullscreen = ref(!!params.modal.fullscreen);
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

    toggleFullScreen = () => {
        this.fullscreen.value = !this.fullscreen.value;
    };
}