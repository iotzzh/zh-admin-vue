import moment from 'moment';
import { Ref, ref } from 'vue';
import { TZHTablePage, TZHTableRequest, TZHTableFormSettings, TZHTableFromField, TZHFromFieldConvertDateTime } from './type';
import _ from 'lodash';


export default class Form {
  page: Ref<TZHTablePage>;
  request: Ref<TZHTableRequest | undefined> | undefined;
  formSettings: Ref<TZHTableFormSettings | undefined> | undefined;
  refZHForm: any;
  constructor(
    page: Ref<TZHTablePage>,
    request: Ref<TZHTableRequest | undefined> | undefined,
    formSettings: Ref<TZHTableFormSettings | undefined> | undefined,
    refZHForm: any
  ) {
    this.page = page;
    this.request = request;
    this.formSettings = formSettings;
    this.refZHForm = refZHForm;
  }

  formModel = ref({} as any);

  // init = async () => {
  //   if (
  //     !this.formSettings?.value?.fields ||
  //     this.formSettings.value?.fields.length === 0
  //   )
  //     return;
  //   for (const field of this.formSettings.value.fields) {
  //     this.formModel.value[field.prop] = field.defaultValue;
  //   }
  // };

  // 针对需要转换数据的情况：field: a -> b
  useConvert = (model: { [key: string]: string }, fields: TZHTableFromField[]) => {
    const needConverTFromFields = fields.filter((x) => x.convert);
    for (let i = 0; i < needConverTFromFields.length; i++) {
      const method: Function | undefined = needConverTFromFields[i].convert;
      if (!method) return;
      model[needConverTFromFields[i].prop] = method(
        model[needConverTFromFields[i].prop],
        model
      );
    }
  };

  // 针对需要额外转换时间的参数，convertDateTime格式：[ { field: '', format: '',} ]
  // 只应用于时间范围转换功能，field: [2022.1.1, 2022.3.3] -> filedA: 2022.1.1 22:11:11, fieldB: 2022.3.3 10:11:11
  useConvertDateTime = (model: { [key: string]: string }, fields: TZHTableFromField[]) => {
    const needConvertDateTimeFields: TZHTableFromField[] = fields.filter(
      (x) => x.convertDateTime
    );
    for (let i = 0; i < needConvertDateTimeFields.length; i++) {
      const value = model[needConvertDateTimeFields[i].prop];
      if (!value) continue;
      for (let j = 0; j < value.length; j++) {
        const convertDateTimeArr = needConvertDateTimeFields[i]
          .convertDateTime as Array<TZHFromFieldConvertDateTime>;
        const field = convertDateTimeArr[j].field;
        const format = convertDateTimeArr[j].format;
        model[field] = moment(value[j]).format(format);
      }
      delete model[needConvertDateTimeFields[i].prop];
    }
  };

  useExtendedFieldMethod = (
    model: { [key: string]: string },
    fields: TZHTableFromField[]
  ) => {
    // 针对需要额外扩展的参数，例如 { a: 'a' } => { b: 'a1', c: 'a2' }
    const needExtendFields: TZHTableFromField[] = fields.filter(
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

    const customModel = this.formSettings?.value?.customModel && JSON.parse(JSON.stringify(this.formSettings?.value?.customModel));

    if (this.formSettings?.value?.fields) {
      this.useConvert(model, this.formSettings?.value?.fields);
      this.useConvertDateTime(model, this.formSettings?.value?.fields);
      this.useExtendedFieldMethod(model, this.formSettings?.value?.fields);
      this.removeEmptyField(model);
    }

    let params = {
      // offset: (this.page.value.current - 1) * this.page.value.size,
      // limit: this.page.value.size,
      current: this.page.value.current,
      size: this.page.value.size,
      ...this.request?.value?.conditionsList,
      ...model,
      ...customModel,
    };

    if (this.formSettings?.value?.convertParams) {
      params = this.formSettings.value?.convertParams(params);
    }

    return params;
  };

  getSearchFormModel = () => {
    return this.formModel.value;
  };

  getSearchFormParams = () => {
    return this.getSearchParams();
  };

  _convertSlotName = (prop: string):string => {
    return 'zh-form-' + prop;
  };

  _getNotChangeTriggerSearchFields = () => {
    return this.formSettings?.value?.fields?.filter((x: TZHTableFromField) => x.notChangeTriggerSearch) || [];
  };

  _compareNeedTriggerSearchFieldsIsEqual = (newVal: { [x: string]: any }, oldVal: { [x: string]: any }) => {
    const notChangeTriggerSearchFields = this._getNotChangeTriggerSearchFields();
    const oldValNeedTriggerSearchFields = oldVal;
    const newValNeedTriggerSearchFields = newVal;
    for (let i = 0; i < notChangeTriggerSearchFields.length; i++) {
      delete oldValNeedTriggerSearchFields[notChangeTriggerSearchFields[i].prop];
      delete newValNeedTriggerSearchFields[notChangeTriggerSearchFields[i].prop];
    }

    return _.isEqual(oldValNeedTriggerSearchFields, newValNeedTriggerSearchFields);
  };
}
