import { Ref } from 'vue';
import { TZHformConfig } from '../zh-form/type';

export default class ZHFormModal {
    emit: any;
    refZHModal: any;
    refZHForm: any;
    formSettings: Ref<TZHformConfig | undefined>;
    modelValue: any;
    constructor(params: any) {
        this.refZHModal = params.refZHModal;
        this.emit = params.emit;
        this.refZHForm = params.refZHForm;
        this.formSettings = params.formSettings;
        this.modelValue = params.modelValue;
    }

    initForm = () => {
        this.refZHForm.value && this.refZHForm.value.init();
    };

    setModalFormModel = (data:{[x:string]: any}) => {
        const keys = Object.keys(data);
        for (const key of keys) {
            this.modelValue.value[key] = data[key];
        }
    };

    clearFormData = () => {
        this.refZHForm.value && this.refZHForm.value.clearFormData();
    };

    open = () => {
        this.refZHModal.value.open();
    };

    close = () => {
        this.emit('close');
        // this.refZHForm.value && this.refZHForm.value.clearFormData();
    };

    cancel = () => {
        this.emit('cancel');
        // this.refZHForm.value && this.refZHForm.value.clearFormData();
    };

    submit = async () => {
        if (await this.refZHForm.value.validate()) {
            this.emit('submit');
        }
    };
}