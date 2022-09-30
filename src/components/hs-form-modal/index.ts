
/*
 * @Author: zzh
 * @Date: 2022-03-26 16:13:30
 * @LastEditors: zzh
 * @LastEditTime: 2022-04-02 16:23:04
 * @Description: 
 * @FilePath: \hwason-laboratory-systems\src\components\hs-form-modal\index.ts
 */
import { FormInstance } from 'element-plus';

class modal {
    emit: any;
    modal: any;
    formRef: any;
    itemRefs: any;
    formSettings: any;
    constructor(params: any) {
        this.modal = params.modal;
        this.emit = params.emit;
        this.formRef = params.formRef;
        this.itemRefs = params.itemRefs;
        this.formSettings = params.formSettings;
    }

    handleClose = () => {
        this.emit('close');
        console.log(this.modal);
    };

    handleSubmit = (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        formEl.validate((valid) => {
            if (valid) {
                this.emit('submit');
            } else {
                return false;
            }
        });

    };

    changeCascader = (refName: any) => {
        // 将级联选择器选中的节点存储起来
        const refValue = this.itemRefs && this.itemRefs.value[refName];
        const filed:any = this.formSettings.value.fields && this.formSettings.value.fields.find((x:any) => x.refName === refName);
        if (!filed) return;
        filed.checkedNodes = refValue.getCheckedNodes();
    };
}

export { modal };