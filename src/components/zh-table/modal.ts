import { computed, Ref, ref, nextTick } from 'vue';
import { TModal } from '../zh-form-modal/type';
import { TZHFormSettings } from '../zh-form/type';
import { popErrorMessage } from '../zh-message';
import { TZHTableRequest, TZHTableRequestResult, TZHTableColumnUseInModal, TZHTableFromField, TZHFromFieldConvertDateTime, TZHTableSetting, TZHTableColumn } from './type';
import Table from './table';
import ZHRequest from '../zh-request';
import { TParams } from '../zh-request/type';
import moment from 'moment';



export default class Modal {
  // addModalFormSettings: Ref<TZHFormSettings>;
  // formSettings: Ref<TZHFormSettings>;
  request: Ref<TZHTableRequest | undefined> | undefined;
  table: Table;
  refZHFormModal: Ref<any>;
  tableSettings: Ref<TZHTableSetting>;
  constructor(
    request: Ref<TZHTableRequest | undefined> | undefined,
    table: Table,
    refZHFormModal: Ref<any>,
    tableSettings: Ref<TZHTableSetting>) {
    this.table = table;
    this.request = request;
    this.refZHFormModal = refZHFormModal;
    this.tableSettings = tableSettings;
    // this.addModalFormSettings = addModalFormSettings;
    // this.formSettings = ref(addModalFormSettings.value);
  }

  formSettings = computed(() => {
    return {
      // eslint-disable-next-line no-prototype-builtins
      fields: this.table.columns.value?.filter((x: any) => x.hasOwnProperty('addEditInfo')).map((y: any) => {
        return {
          ...y,
          ...y.addEditInfo,
        };
      }),
    } as TZHFormSettings;
  });

  modal = ref({ show: false, title: '新增', } as TModal);

  formModel = ref({} as any);

  openAddModal = () => {
    this.modal.value.type = 'add';
    // 在新增时，有些字段带有默认值
    this._setDefaultValue();
    this.modal.value.show = true;
  };

  _setDefaultValue = () => {
    const fieldsWithDefaultValue = this.formSettings.value.fields?.filter((x: any) => x.defaultValue !== null && x.defaultValue !== undefined);
    const newPropertyArray: Array<{ property: string, defaultValue: any }> = fieldsWithDefaultValue?.map((x: TZHTableColumnUseInModal) => { return { property: x.prop, defaultValue: x.defaultValue }; }) || [];
    const newObj: any = {};
    for (let i = 0; i < newPropertyArray.length; i++) {
      newObj[newPropertyArray[i].property] = newPropertyArray[i].defaultValue;
    }
    this.formModel.value = { ...newObj };
  };

  openEditModal = (row: any) => {
    this.formModel.value = { ...row };
    this.modal.value.type = 'edit';
    this.modal.value.show = true;
  };

  close = () => {
    this.formModel.value = {};
    this.modal.value.show = false;
  };

  cancel = () => {
    this.formModel.value = {};
    this.modal.value.show = false;
  };

  // 针对需要转换数据的情况：field: a -> b
  useConvert = (model: { [key: string]: string }, fields: TZHTableColumn[]) => {
    const needConverTFromFields = fields.filter((x) => x.addEditInfo && x.addEditInfo!.convert);
    for (let i = 0; i < needConverTFromFields.length; i++) {
      const method: Function | undefined = needConverTFromFields[i].addEditInfo!.convert;
      if (!method) return;
      model[needConverTFromFields[i].prop!] = method(
        model[needConverTFromFields[i].prop!],
        model, 
        this.formSettings.value
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

    const customModel = this.tableSettings.value.modal?.customModel && JSON.parse(JSON.stringify(this.tableSettings.value.modal?.customModel));

    if (this.formSettings?.value?.fields) {
      this.tableSettings.value.columns && this.useConvert(model, this.tableSettings.value.columns);
      // this.useConvertDateTime(model, this.formSettings?.value?.fields);
      // this.useExtendedFieldMethod(model, this.formSettings?.value?.fields);
      // this.removeEmptyField(model);
    }

    const params = {
      ...model,
      ...customModel,
    };

    // if (this.formSettings?.value?.convertParams) {
    //   params = this.formSettings.value?.convertParams(params);
    // }

    return params;
  };

  submit = async () => {
    this.refZHFormModal.value.toggleLodadingSubmit(true);
    const params: TParams = {
      url: this.modal.value.type === 'add' ?
        this.request?.value?.urlAdd || '' :
        this.request?.value?.urlUpdate || '',
      conditions: this.getSearchParams(),
    };

    console.log('submit', params);

    const result: TZHTableRequestResult = await ZHRequest.post(params);
    if (result.success) {
      this.close();
      this.table.initData();
    }
    await nextTick();
    this.refZHFormModal.value.toggleLodadingSubmit(false);
  };
}
