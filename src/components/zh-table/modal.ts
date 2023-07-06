import { computed, Ref, ref, nextTick } from 'vue';
import { TZHFormModal } from '../zh-form-modal/type';
import { TZHTableRequest, TZHTableRequestResult, TZHTableSetting, TObject } from './type';
import Table from './table';
import ZHRequest from '../zh-request';
import { TZHRequestParams } from '../zh-request/type';
import { TZHFormSettings } from '../zh-form/type';



export default class Modal {
  table: Table;
  refZHFormModal: Ref<any>;
  emit: any;
  request: TZHTableRequest | undefined;
  tableSettings: TZHTableSetting;
  constructor(
    request: TZHTableRequest | undefined,
    table: Table,
    refZHFormModal: Ref<any>,
    tableSettings: TZHTableSetting,
    emit: any
  ) {
    this.table = table;
    this.request = request;
    this.refZHFormModal = refZHFormModal;
    this.tableSettings = tableSettings;
    this.emit = emit;
  }

  columnFunctionFields = ['convert'];
  _getObjctWithoutFunction = (obj: TObject) => {
    const keys = Object.keys(obj);
    const newObj = {};
    keys.forEach((x: string) => {
      if (typeof obj[x] !== 'function' && !this.columnFunctionFields.find((y:string) => y === x)) {
        newObj[x] = obj[x];
      }
    });
    return newObj;
  };

  formSettings = computed(() => {
    return {
      // eslint-disable-next-line no-prototype-builtins
      fields: this.tableSettings.columns?.filter((x: any) => x.hasOwnProperty('addEditInfo')).map((y: any) => {
        return {
          ...this._getObjctWithoutFunction(y),
          ...y.addEditInfo,
        };
      }).sort((m: any, n: any) => m.addSort - n.addSort > 0 ? 1 : -1),
      customValidate: this.tableSettings.modal?.formSettings && this.tableSettings.modal?.formSettings.customValidate,
      ... this.tableSettings.modal?.formSettings
    } as TZHFormSettings;
  });

  modal = ref({ show: false, title: '新增', loadingSubmit: false, } as TZHFormModal);

  formModel = ref({} as any);
  convertedModel = ref({} as any);

  openAddModalData = ref({} as any);
  openAddModal = (data: any = undefined) => {
    this.modal.value.type = 'add';
    this.modal.value.title = this.modal.value.mainTitle ? '新增' + this.modal.value.mainTitle : '新增';
    this.modal.value.show = true;
    this.modal.value = { ...this.modal.value, ...this.tableSettings.modal };
    // 在新增时，有些字段带有默认值
    this.refZHFormModal.value.initForm();
    this.openAddModalData.value = data;
  };

  openEditModalData = ref({} as any);
  openEditModal = async (row: any) => {
    this.modal.value.type = 'edit';
    this.modal.value.title = this.tableSettings.modal?.mainTitle ? '编辑' + this.tableSettings?.modal?.mainTitle : '编辑';
    this.modal.value.show = true;
    await nextTick();
    this.formModel.value = { ...row };
    this.openEditModalData.value = { ...row };
    this.modal.value = { ...this.modal.value, ...this.tableSettings.modal };
  };

  opened = () => {
    this.emit('opened', {
      modal: this.modal.value,
      formModel: this.formModel.value,
      openAddModalData: this.openAddModalData.value,
      openEditModalData: this.openEditModalData.value
    });
  };

  setModalFormModel = (data: { [x: string]: any }) => {
    const keys = Object.keys(data);
    for (const key of keys) {
      this.formModel.value[key] = data[key];
    }
  };

  close = () => {
    this.formModel.value = {};
    this.convertedModel.value = {};
    this.modal.value.show = false;
  };

  cancel = () => {
    this.formModel.value = {};
    this.convertedModel.value = {};
    this.modal.value.show = false;
  };



  getParams = () => {
    const convertedModel = this.convertedModel.value
      ? JSON.parse(JSON.stringify(this.convertedModel.value))
      : {};

    const customModel = this.tableSettings.modal?.formSettings?.customModel && JSON.parse(JSON.stringify(this.tableSettings.modal?.formSettings?.customModel));

    const params = {
      ...convertedModel,
      ...customModel,
    };

    // if (this.formSettings?.value?.convertParams) {
    //   params = this.formSettings.value?.convertParams(params);
    // }

    return params;
  };

  submit = async () => {
    // this.refZHFormModal.value.toggleLodadingSubmit(true);
    this.modal.value.loadingSubmit = true;
    const conditions = this.getParams();

    if (this.tableSettings?.modal?.onBeforeSubmit) { await this.tableSettings.modal.onBeforeSubmit({ modal: this.modal.value, conditions, }); }

    const params: TZHRequestParams = {
      url: this.modal.value.type === 'add' ?
        this.request?.add?.url || '' :
        this.request?.update?.url || '',
      conditions,
      successMessage: this.modal.value.type === 'add' ? this.request?.add?.successMessage : this.request?.update?.successMessage,
      errorMessage: this.modal.value.type === 'add' ? this.request?.add?.errorMessage : this.request?.update?.errorMessage,
    };

    // console.log('submit', params);

    const result: TZHTableRequestResult = await ZHRequest.post(params);
    if (result.success) {
      this.close();
      this.table.initData();
    }
    await nextTick();
    this.modal.value.loadingSubmit = false;

    if (this.tableSettings?.modal?.onAfterSubmit) { await this.tableSettings.modal.onAfterSubmit({ modal: this.modal.value, conditions, result }); }
  };
}
