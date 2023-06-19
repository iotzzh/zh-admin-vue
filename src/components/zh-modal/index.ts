import { Ref, ref } from 'vue';

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

    submit = async () => {
        // if(this.modal.value.onBeforeSubmit) {
        //     if (typeof this.modal.value.onBeforeSubmit === 'string') {
                
        //     } else {

        //     }
        // }
        this.emit('submit');

        // if(this.modal.value.onAfterSubmit) {

        // } else {
            
        // }
    };

    cancel = () => {
        this.emit('cancel');
    };

    toggleFullScreen = () => {
        this.fullscreen.value = !this.fullscreen.value;
    };
}