import { computed, Ref, ref } from 'vue';
import { TZHTablePage, TZHTableRequest, TZHTableRequestResult, TZHTableSetting } from './type';
import Form from './form';
import { isMessageConfirm, popErrorMessage } from '../zh-message';
import { TParams } from '../zh-request/type';
import ZHRequest from '../zh-request';
import { debounce, throttle } from 'lodash';

export default class Table {
  refTable: any;
  request: Ref<TZHTableRequest | undefined> | undefined;
  pageData: any;
  form: Form;
  tableSettings: Ref<TZHTableSetting>;
  constructor(
    tableSettings: Ref<TZHTableSetting>,
    refTable: any,
    request: Ref<TZHTableRequest | undefined> | undefined,
    form: Form,
    pageData: Ref<TZHTablePage>
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

  columns = computed(() => {
    return this.tableSettings.value.columns?.filter((x: any) => !x.notDisplay);
  });

  onBeforeInitData = async () => {
    const method: Function = this.tableSettings.value.onBeforeInitData || new Function();
    await method();
  };

  initData = async (propParams: Object | null = null, initPage = true,) => {
    this.onBeforeInitData();
    this.loading.value = true;
    // 参数
    if (initPage) this.pageData.value.current = 1;
    const params = propParams || this.form.getSearchParams();
    const args: TParams = {
      url: this.request?.value?.urlList || '',
      conditions: params
    };
    console.log('params', params);
    // 获取数据
    const result: TZHTableRequestResult = await ZHRequest.post(args);
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

  debounceInitData = debounce(this.initData, 500);
  throttleInitData = throttle(this.initData, 1500);

  getData = () => { return this.data.value; };

  getDataAsync = async (propParams?: Object) => {
    const params = propParams || this.form.getSearchParams();
    const result: TZHTableRequestResult = await ZHRequest.post(params);
    return result;
  };

  getDataWithInitTable = async (propParams: Object | null = null, initPage = true) => {
    await this.initData(propParams, initPage);
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
    const result: TZHTableRequestResult = await ZHRequest.post(params);
    if (result.success) {
      this.debounceInitData();
    }
  };

  rowDelete = async (row: any) => {
    const msgResult = await isMessageConfirm('确认删除？', '提示');
    if (!msgResult) return;
    const params: TParams = {
      url: this.request?.value?.urlDelete || '',
      conditions: { ...row },
    };
    const result: TZHTableRequestResult = await ZHRequest.post(params);
    if (result.success) {
      this.debounceInitData();
    }
  };

  rowClick = async (row: any, column: any, event: any) => {
    this.tableSettings.value.rowClick &&
      this.tableSettings.value.rowClick({ row, column, event });
  };
}
