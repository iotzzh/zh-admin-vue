import { Ref } from 'vue';
import { TZHFormSettings, TZHFromField } from '../zh-form/type';
import { TZHModalFromField } from './type';

export default class ZHFormModal {
    emit: any;
    modal: any;
    refZHForm: any;
    formSettings: Ref<TZHFormSettings | undefined>;
    modelValue: any;
    constructor(params: any) {
        this.modal = params.modal;
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