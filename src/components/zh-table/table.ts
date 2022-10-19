import { Ref, ref } from 'vue';
import { TPage, TRequest, TRequestResult, TTableSetting } from './type';
import Form from './form';
import { isMessageConfirm, popErrorMessage } from '../zh-message';
import { TParams } from '../zh-request/type';

export default class {
  refTable: any;
  request: Ref<TRequest | undefined> | undefined;
  pageData: any;
  form: Form;
  tableSettings: Ref<TTableSetting>;
  constructor(
    tableSettings: Ref<TTableSetting>,
    refTable: any,
    request: Ref<TRequest | undefined> | undefined,
    form: Form,
    pageData: Ref<TPage>
  ) {
    this.tableSettings = tableSettings;
    this.refTable = refTable;
    this.request = request;
    this.pageData = pageData;
    this.form = form;
    if (
      this.request?.value &&
      this.request.value.urlList &&
      (this.request.value.initialData ||
        this.request.value.initialData === undefined)
    )
      this.initData();
  }

  data = ref([] as any);
  loading = ref(false);

  _getData = (params: Object) => {
    // return ipcRenderer.sendSync(
    //   this.request?.value?.urlList || '',
    //   params || {}
    // );
  };

  initData = (propParams?: Object) => {
    this.loading.value = true;
    // 参数
    this.pageData.value.current = 1;
    const params = propParams || this.form.getSearchParams();
    console.log('params', params);
    // 获取数据
    const result = this._getData(params);
    // 处理数据
    // if (result.resCode === '00') {
    //   this.data.value = result.data;
    //   this.pageData.value.total = result.count;
    // } else {
    //   this.data.value = [];
    //   this.pageData.value.total = 0;
    //   popErrorMessage(this.request?.value?.errorMessage || '获取数据失败');
    // }

    this.loading.value = false;
  };

  getData = () => {
    return this.data.value;
  };

  batchDelete = async () => {
    const msgResult = await isMessageConfirm('确认删除？', '提示');
    if (!msgResult) return;
    const selections = this.refTable.value.getSelectionRows();
    const params: TParams = {
      url: this.request?.value?.urlBatchDelete || '',
      conditions: {
        ids: selections.map((x: any) => x.id),
      },
    };
    const result: TRequestResult = await sendSync(params);
    if (result.success) {
      this.initData();
    }
  };

  rowDelete = async (row: any) => {
    const msgResult = await isMessageConfirm('确认删除？', '提示');
    if (!msgResult) return;
    const params: TParams = {
      url: this.request?.value?.urlDelete || '',
      conditions: { ...row },
    };
    const result: TRequestResult = await sendSync(params);
    if (result.success) {
      this.initData();
    }
  };

  rowClick = async (row: any, column: any, event: any) => {
    this.tableSettings.value.rowClick &&
      this.tableSettings.value.rowClick({ row, column, event });
  };
}
