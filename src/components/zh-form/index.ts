import { ref, Ref } from 'vue';
import { TZHFormSettings } from './type';

export default class Form {
  emit: any;
  refForm: any;
  formSettings: Ref<TZHFormSettings>;
  hideUnimportantFields: Ref<boolean | undefined>;
  modelValue: any;
  constructor(params: any) {
    this.emit = params.emit;
    this.refForm = params.refForm;
    this.formSettings = params.formSettings;
    this.hideUnimportantFields = ref(params.formSettings.value.hideUnimportantFields);
    this.modelValue = params.modelValue;
  }

  validate = async () => {
    if (!this.refForm.value) return;
    const result = await this.refForm.value.validate((valid: any) => {
      return valid;
    });
    return result;
  };

  changeCascader = (itemRefs: any, refName: any, formSettings: any) => {
    // 将级联选择器选中的节点存储起来
    const refValue = itemRefs && refName && itemRefs[refName];
    if (!refValue) return;
    const filed: any = formSettings.fields && formSettings.fields.find((x: any) => x.refName === refName);
    if (!filed) return;
    filed.checkedNodes = refValue.getCheckedNodes();
  };

  init = async () => {
    if (
      !this.formSettings?.value?.fields ||
      this.formSettings.value?.fields.length === 0
    )
      return;
    for (const field of this.formSettings.value.fields) {
      this.modelValue.value[field.prop] = field.defaultValue;
    }
  };
}
