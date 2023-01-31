import { computed, Ref, ref, nextTick } from 'vue';
import { TZHModalForm } from '../zh-modal-form/type';
import { TZHTableRequest, TZHTableRequestResult, TZHTableColumnAddEditInfo, TZHTableFromField, TZHFromFieldConvertDateTime, TZHTableSetting, TZHTableColumn, TObject } from './type';
import Table from './table';
import ZHRequest from '../zh-request';
import { TZHRequestParams } from '../zh-request/type';
import { TZHFormSettings } from '../zh-form/type';



export default class Modal {
  request: Ref<TZHTableRequest | undefined> | undefined;
  table: Table;
  refZHFormModal: Ref<any>;
  tableSettings: Ref<TZHTableSetting>;
  emit: any;
  constructor(
    request: Ref<TZHTableRequest | undefined> | undefined,
    table: Table,
    refZHFormModal: Ref<any>,
    tableSettings: Ref<TZHTableSetting>,
    emit:any
    ) {
    this.table = table;
    this.request = request;
    this.refZHFormModal = refZHFormModal;
    this.tableSettings = tableSettings;
    this.emit = emit;
  }

  _getObjctWithoutFunction = (obj: TObject) => {
    const keys = Object.keys(obj);
    const newObj = {};
    keys.forEach((x: string) => {
      if (typeof obj[x] !== 'function') {
        newObj[x] = obj[x];
      }
    });
    return newObj;
  };

  formSettings = computed(() => {
    return {
      // eslint-disable-next-line no-prototype-builtins
      fields: this.tableSettings.value.columns?.filter((x: any) => x.hasOwnProperty('addEditInfo')).map((y: any) => {
        return {
          ...this._getObjctWithoutFunction(y),
          ...y.addEditInfo,
        };
      }).sort((m:any, n: any) => m.addSort - n.addSort > 0 ? 1 : -1),
      customValidate: this.tableSettings.value.modal?.formSettings && this.tableSettings.value.modal?.formSettings.customValidate,
      ... this.tableSettings.value.modal?.formSettings
    } as TZHFormSettings;
  });

  modal = ref({ show: false, title: '新增', loadingSubmit: false, } as TZHModalForm);

  formModel = ref({} as any);
  convertedModel = ref({} as any);

  openAddModalData = ref({} as any);
  openAddModal = (data:any = undefined) => {
    this.modal.value.type = 'add';
    this.modal.value.title = '新增';
    // 在新增时，有些字段带有默认值
    this.refZHFormModal.value.initForm();
    this.modal.value.show = true;
    this.openAddModalData.value = data;
    this.modal.value = { ...this.modal.value, ...this.tableSettings.value.modal};
  };
  
  openEditModalData = ref({} as any);
  openEditModal = (row: any) => {
    this.formModel.value = { ...row };
    this.modal.value.type = 'edit';
    this.modal.value.title = '编辑';
    this.modal.value.show = true;
    this.openEditModalData.value = { ...row };
    this.modal.value = { ...this.modal.value, ...this.tableSettings.value.modal};
  };

  opened = () => {
    this.emit('opened', { 
      modal: this.modal.value, 
      formModel: this.formModel.value, 
      openAddModalData: this.openAddModalData.value, 
      openEditModalData: this.openEditModalData.value  
    });
  };

  setModalFormModel = (data:{[x:string]: any}) => {
    const keys = Object.keys(data);
    for (const key of keys) {
      this.formModel.value[key] = data[key];
    }
  };

  close = () => {
    this.formModel.value = {};
    this.modal.value.show = false;
  };

  cancel = () => {
    this.formModel.value = {};
    this.modal.value.show = false;
  };



  getParams = () => {
    const convertedModel = this.convertedModel.value
      ? JSON.parse(JSON.stringify(this.convertedModel.value))
      : {};

    const customModel = this.tableSettings.value.modal?.formSettings?.customModel && JSON.parse(JSON.stringify(this.tableSettings.value.modal?.formSettings?.customModel));

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

    if (this.tableSettings?.value?.modal?.onBeforeSubmit) { await this.tableSettings.value.modal.onBeforeSubmit({ modal: this.modal.value, conditions, }); }
    
    const params: TZHRequestParams = {
      url: this.modal.value.type === 'add' ?
        this.request?.value?.add?.url || '' :
        this.request?.value?.update?.url || '',
      conditions,
      successMessage: this.modal.value.type === 'add' ? this.request?.value?.add?.successMessage : this.request?.value?.update?.successMessage,
      errorMessage: this.modal.value.type === 'add' ? this.request?.value?.add?.errorMessage : this.request?.value?.update?.errorMessage,
    };

    console.log('submit', params);

    const result: TZHTableRequestResult = await ZHRequest.post(params);
    if (result.success) {
      this.close();
      this.table.initData();
    }
    await nextTick();
    this.modal.value.loadingSubmit = false;

    if (this.tableSettings?.value?.modal?.onAfterSubmit) { await this.tableSettings.value.modal.onAfterSubmit({ modal: this.modal.value, conditions, }); }
  };
}
