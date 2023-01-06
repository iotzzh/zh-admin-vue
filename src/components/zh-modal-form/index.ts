import { Ref } from "vue";
import { TZHFormSettings, TZHFromField } from "../zh-form/type";
import { TZHModalFromField } from "./type";

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

    init = () => {
        this.refZHForm.value && this.refZHForm.value.init();
    };

    close = () => {
        this.emit('close');
    };

    cancel = () => {
        this.emit('cancel');
    };

    submit = async () => {
        if (await this.refZHForm.value.validate()) {
            this.emit('submit');
        }
    };
}