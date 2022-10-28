import { Ref, ref } from 'vue';
import { TPage, TRequest, TRequestResult, TTableSetting } from './type';
import Form from './form';
import { isMessageConfirm, popErrorMessage } from '../zh-message';
import { TParams } from '../zh-request/type';
import ZHRequest from '../zh-request';

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

  initData = async (propParams: Object | null = null, initPage = true,) => {
    this.loading.value = true;
    // 参数
    if (initPage) this.pageData.value.current = 1;
    const params = propParams || this.form.getSearchParams();
    const args:TParams = {
      url: this.request?.value?.urlList || '',
      conditions: params
    };
    console.log('params', params);
    // 获取数据
    const result: TRequestResult = await ZHRequest.post(args);
    // 处理数据
    if (result.success) {
      this.data.value = result.data.records;
      this.pageData.value.total = result.data.total;
    } else {
      this.data.value = [];
      this.pageData.value.total = 0;
    }
    this.loading.value = false;
  };

  getData = () => { return this.data.value; };

  getDataAsync = async (propParams?: Object) => { 
    const params = propParams || this.form.getSearchParams();
    const result: TRequestResult = await ZHRequest.post(params);
    return result;
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
    const result: TRequestResult = await ZHRequest.post(params);
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
    const result: TRequestResult = await ZHRequest.post(params);
    if (result.success) {
      this.initData();
    }
  };

  rowClick = async (row: any, column: any, event: any) => {
    this.tableSettings.value.rowClick &&
      this.tableSettings.value.rowClick({ row, column, event });
  };
}
