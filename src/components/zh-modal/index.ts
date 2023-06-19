import { Ref, ref } from 'vue';
import { TZHModal } from './type';

export class ZHModal {
    emit: (event: 'close' | 'submit' | 'cancel' | 'opened', ...args: any[]) => void;
    modal: Ref<TZHModal>;
    fullscreen: Ref<boolean>;
    constructor(modal: Ref<TZHModal>, emit: (event: 'close' | 'submit' | 'cancel' | 'opened', ...args: any[]) => void) {
        this.modal = modal;
        this.emit = emit;
        this.fullscreen = ref(modal.value.fullscreen || false);
    }

    close = () => {
        this.emit('close');
    };

    private executeOnBeforeSubmit = () => {
        if (!this.modal.value.onBeforeSubmit) return;
        if (typeof this.modal.value.onBeforeSubmit === 'string')
            (new Function('params', this.modal.value.onBeforeSubmit))(this.modal.value);
        else
            this.modal.value.onBeforeSubmit(this.modal.value);
    };

    private executeOnAfterSubmit = () => {
        if (!this.modal.value.onAfterSubmit) return;
        if (typeof this.modal.value.onAfterSubmit === 'string')
            (new Function('params', this.modal.value.onAfterSubmit))(this.modal.value);
        else
            this.modal.value.onAfterSubmit(this.modal.value);
    };

    submit = async () => {
        this.executeOnBeforeSubmit();
        this.emit('submit');
        this.executeOnAfterSubmit();
    };

    cancel = () => {
        this.emit('cancel');
    };

    toggleFullScreen = () => {
        this.fullscreen.value = !this.fullscreen.value;
    };

}