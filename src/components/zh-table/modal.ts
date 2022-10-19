import { Ref, ref } from 'vue';
import { TModal } from '../zh-form-modal/type';
import { TFormSettings } from '../zh-form/type';
import { popErrorMessage } from '../zh-message';
// import { sendSync } from '../zh-request';
import { TRequest, TRequestResult } from './type';
import Table from './table';

export default class {
  addModalFormSettings: Ref<TFormSettings>;
  formSettings: Ref<TFormSettings>;
  request: Ref<TRequest | undefined> | undefined;
  table: Table;
  constructor(addModalFormSettings: Ref<TFormSettings>,
    request: Ref<TRequest | undefined> | undefined,
    table: Table) {
    this.table = table;
    this.request = request;
    this.addModalFormSettings = addModalFormSettings;
    this.formSettings = ref(addModalFormSettings.value);
  }
  modal = ref({
    show: false,
    title: '新增',
  } as TModal);

  formModel = ref({} as any);

  openAddModal = () => {
    this.modal.value.type = 'add';
    this.modal.value.show = true;
  };

  openEditModal = (row: any) => { 
    this.formModel.value = {...row};
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

  submit = async () => {
    const parmas = {
      url: this.modal.value.type === 'add' ?  
        this.request?.value?.urlAdd : 
        this.request?.value?.urlEdit,
      conditions: this.formModel.value,
    };
    // const result:TRequestResult = await sendSync(parmas);
    // if (result.success) {
    //   this.modal.value.show = false;
    //   this.table.initData();
    // } else {
    //   popErrorMessage('操作失败');
    // }
  };
}
