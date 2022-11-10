export default class Form {
  emit: any;
  refForm: any;
  constructor(params: any) {
    this.emit = params.emit;
    this.refForm = params.refForm;
  }

  validate = async () => {
    if (!this.refForm.value) return;
    const result = await this.refForm.value.validate((valid: any) => {
      return valid;
    });
    return result;
  };

  changeCascader = (itemRefs:any, refName:any, formSettings:any) => {
    // 将级联选择器选中的节点存储起来
    const refValue = itemRefs && refName && itemRefs[refName];
    if (!refValue) return;
    const filed:any = formSettings.fields && formSettings.fields.find((x:any) => x.refName === refName);
    if (!filed) return;
    filed.checkedNodes = refValue.getCheckedNodes();
};
}
