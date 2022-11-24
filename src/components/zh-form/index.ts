import _ from 'lodash';
import dayjs from 'dayjs';
import { ref, Ref, watch, nextTick } from 'vue';
import { TZHFormSettings, TZHFromField, TZHFromFieldConvertDateTime } from './type';

export default class Form {
  emit: any;
  refForm: any;
  formSettings: Ref<TZHFormSettings>;
  hideUnimportantFields: Ref<boolean | undefined>;
  modelValue: any;
  convertedModel: any;
  constructor(params: any) {
    this.emit = params.emit;
    this.refForm = params.refForm;
    this.formSettings = params.formSettings;
    this.hideUnimportantFields = ref(params.formSettings.value.hideUnimportantFields);
    this.modelValue = params.modelValue;
    this.convertedModel = params.convertedModel;
  }

  init = () => {
    if (
      !this.formSettings?.value?.fields ||
      this.formSettings.value?.fields.length === 0
    )
      return;
    for (const field of this.formSettings.value.fields) {
      if (this.modelValue && this.modelValue.value) this.modelValue.value[field.prop] = field.defaultValue;
      if (this.convertedModel && this.convertedModel.value) this.convertedModel.value[field.prop] = field.defaultValue;
    }
  };

  validate = async () => {
    if (!this.refForm.value) return;
    if (this.formSettings?.value?.customValidate && !this.formSettings?.value?.customValidate(this.modelValue?.value)) return false;
    const result = await this.refForm.value.validate((valid: any) => {
      return valid;
    });
    return result;
  };

  //#region model 转换方法
  // 针对需要转换数据的情况：field: a -> b
  useConvert = (model: { [key: string]: string }, convertedModel: { [key: string]: string }, fields: TZHFromField[]) => {
    const needConverTFromFields = fields.filter((x) => x.convert);
    for (let i = 0; i < needConverTFromFields.length; i++) {
      const method: Function | undefined = needConverTFromFields[i].convert;
      if (!method || !convertedModel) return;
      convertedModel[needConverTFromFields[i].prop] = method(
        model[needConverTFromFields[i].prop],
        model
      );
    }
  };

  useConvertDateTime = (model: { [key: string]: string }, convertedModel: { [key: string]: string }, fields: TZHFromField[]) => {
    const needConvertDateTimeFields: TZHFromField[] = fields.filter(
      (x) => x.convertDateTime
    );
    for (let i = 0; i < needConvertDateTimeFields.length; i++) {
      const value = model[needConvertDateTimeFields[i].prop];
      if (!value || !convertedModel) continue;
      for (let j = 0; j < value.length; j++) {
        const convertDateTimeArr = needConvertDateTimeFields[i]
          .convertDateTime as Array<TZHFromFieldConvertDateTime>;
        const field = convertDateTimeArr[j].field;
        const format = convertDateTimeArr[j].format;
        convertedModel[field] = dayjs(value[j]).format(format);
      }
      delete convertedModel[needConvertDateTimeFields[i].prop];
    }
  };

  useExtendedFieldMethod = (model: { [key: string]: string }, convertedModel: { [key: string]: string }, fields: TZHFromField[]) => {
    // 针对需要额外扩展的参数，例如 { a: 'a' } => { b: 'a1', c: 'a2' }
    const needExtendFields: TZHFromField[] = fields.filter(
      (x) => x.extendedFieldMethod
    );
    for (let i = 0; i < needExtendFields.length; i++) {
      const method: Function | undefined =
        needExtendFields[i].extendedFieldMethod;
      if (!method || !convertedModel) return;
      const extendMethodResult = method(model[needExtendFields[i].prop], model);

      extendMethodResult.forEach(
        (element: { property: string | number, value: any }) => {
          convertedModel[element.property] = element.value;
        }
      );
      delete convertedModel[needExtendFields[i].prop];
    }
  };

  setConvertModel = async (newVal: any) => {
    if (!this.convertedModel) return;
    this.convertedModel.value = _.cloneDeep(newVal);
    if (!this.convertedModel.value) return;
    this.useConvert(newVal, this.convertedModel.value, this.formSettings.value.fields || []);
    this.useConvertDateTime(newVal, this.convertedModel.value, this.formSettings.value.fields || []);
    this.useExtendedFieldMethod(newVal, this.convertedModel.value, this.formSettings.value.fields || []);

  };
  //#endregion

  //#region 事件
  changeCascader = (itemRefs: any, refName: any, formSettings: any) => {
    // 将级联选择器选中的节点存储起来
    const refValue = itemRefs && refName && itemRefs[refName];
    if (!refValue) return;
    const filed: any = formSettings.fields && formSettings.fields.find((x: any) => x.refName === refName);
    if (!filed) return;
    filed.checkedNodes = refValue.getCheckedNodes();
  };
  //#endregion
}
