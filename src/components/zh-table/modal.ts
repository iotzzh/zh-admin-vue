import { computed, Ref, ref } from 'vue';
import { TModal } from '../zh-form-modal/type';
import { TFormSettings } from '../zh-form/type';
import { popErrorMessage } from '../zh-message';
import { TRequest, TRequestResult } from './type';
import Table from './table';
import ZHRequest from '../zh-request';
import { TParams } from '../zh-request/type';

export default class {
  // addModalFormSettings: Ref<TFormSettings>;
  // formSettings: Ref<TFormSettings>;
  request: Ref<TRequest | undefined> | undefined;
  table: Table;
  constructor(addModalFormSettings: Ref<TFormSettings>,
    request: Ref<TRequest | undefined> | undefined,
    table: Table) {
    this.table = table;
    this.request = request;
    // this.addModalFormSettings = addModalFormSettings;
    // this.formSettings = ref(addModalFormSettings.value);
  }

  formSettings = computed(() => {
    return {
      // eslint-disable-next-line no-prototype-builtins
      fields: this.table.columns.value?.filter((x: any) => x.hasOwnProperty('useAdd')).map((y: any) => {
        return {
          ...y,
          ...y.useAdd,
        };
      }),
    } as TFormSettings;
  });

  modal = ref({ show: false, title: '新增', } as TModal);

  formModel = ref({} as any);

  openAddModal = () => {
    this.modal.value.type = 'add';
    this.modal.value.show = true;
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

  submit = async () => {
    const params: TParams = {
      url: this.modal.value.type === 'add' ?
        this.request?.value?.urlAdd || '' :
        this.request?.value?.urlUpdate || '',
      conditions: this.formModel.value,
    };

    const result: TRequestResult = await ZHRequest.post(params);
    if (!result.success) return;
    this.close();
    this.table.initData();
  };
}
