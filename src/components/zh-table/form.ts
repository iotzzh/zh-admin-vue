import moment from 'moment';
import { Ref, ref } from 'vue';
import { TConvertDateTime, TField, TFormSettings } from '../zh-form/type';
import { TPage, TRequest } from './type';

export default class Form{
  page: Ref<TPage>;
  request: Ref<TRequest | undefined> | undefined;
  formSettings: Ref<TFormSettings | undefined> | undefined;
  constructor(
    page: Ref<TPage>,
    request: Ref<TRequest | undefined> | undefined,
    formSettings: Ref<TFormSettings | undefined> | undefined
  ) {
    this.page = page;
    this.request = request;
    this.formSettings = formSettings;
  }

  formModel = ref({} as any);

  init = async () => {
    if (
      !this.formSettings?.value?.fields ||
      this.formSettings.value?.fields.length === 0
    )
      return;
    for (const field of this.formSettings.value.fields) {
      this.formModel.value[field.prop] = field.defaultValue;
    }
  };

  // 针对需要转换数据的情况：field: a -> b
  useConvert = (model: { [key: string]: string }, fields: TField[]) => {
    const needConvertFields = fields.filter((x) => x.convert);
    for (let i = 0; i < needConvertFields.length; i++) {
      const method: Function | undefined = needConvertFields[i].convert;
      if (!method) return;
      model[needConvertFields[i].prop] = method(
        model[needConvertFields[i].prop],
        model
      );
    }
  };

  // 针对需要额外转换时间的参数，convertDateTime格式：[ { field: '', format: '',} ]
  // 只应用于时间范围转换功能，field: [2022.1.1, 2022.3.3] -> filedA: 2022.1.1 22:11:11, fieldB: 2022.3.3 10:11:11
  useConvertDateTime = (model: { [key: string]: string }, fields: TField[]) => {
    const needConvertDateTimeFields: TField[] = fields.filter(
      (x) => x.convertDateTime
    );
    for (let i = 0; i < needConvertDateTimeFields.length; i++) {
      const value = model[needConvertDateTimeFields[i].prop];
      if (!value) continue;
      for (let j = 0; j < value.length; j++) {
        const convertDateTimeArr = needConvertDateTimeFields[i]
          .convertDateTime as Array<TConvertDateTime>;
        const field = convertDateTimeArr[j].field;
        const format = convertDateTimeArr[j].format;
        model[field] = moment(value[j]).format(format);
      }
      delete model[needConvertDateTimeFields[i].prop];
    }
  };

  useExtendedFieldMethod = (
    model: { [key: string]: string },
    fields: TField[]
  ) => {
    // 针对需要额外扩展的参数，例如 { a: 'a' } => { b: 'a1', c: 'a2' }
    const needExtendFields: TField[] = fields.filter(
      (x) => x.extendedFieldMethod
    );
    for (let i = 0; i < needExtendFields.length; i++) {
      const method: Function | undefined =
        needExtendFields[i].extendedFieldMethod;
      if (!method) return;
      const extendMethodResult = method(model[needExtendFields[i].prop], model);

      extendMethodResult.forEach(
        (element: { property: string | number, value: any }) => {
          model[element.property] = element.value;
        }
      );
      // 衍生出了其他属性后，原有属性是否需要删除，默认删除
      needExtendFields[i].notDeleteOriginProperty &&
        delete model[needExtendFields[i].prop];
    }
  };

  removeEmptyField = (model: { [key: string]: string }) => {
    // 表格里的搜索，如果是""或者为null/undefined均不传参数
    for (const key in model) {
      if (
        model[key] === '' ||
        model[key] === undefined ||
        model[key] === null
      ) {
        delete model[key];
      }
    }
  };

  getSearchParams = () => {
    const model = this.formModel.value
      ? JSON.parse(JSON.stringify(this.formModel.value))
      : {};

    if (this.formSettings?.value?.fields) {
      this.useConvert(model, this.formSettings?.value?.fields);
      this.useConvertDateTime(model, this.formSettings?.value?.fields);
      this.useExtendedFieldMethod(model, this.formSettings?.value?.fields);
      this.removeEmptyField(model);
    }

    const params = {
      // offset: (this.page.value.current - 1) * this.page.value.size,
      // limit: this.page.value.size,
      current: this.page.value.current,
      size: this.page.value.size,
      ...this.request?.value?.conditionsList,
      ...model,
    };
    return params;
  };
}
