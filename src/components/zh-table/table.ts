import { computed, Ref, ref } from 'vue';
import { TZHTablePage, TZHTableRequest, TZHTableRequestResult, TZHTableSetting } from './type';
import Form from './form';
import { isMessageConfirm, popErrorMessage, popSuccessMessage } from '../zh-message';
import { TZHRequestParams } from '../zh-request/type';
import ZHRequest from '../zh-request';
import { debounce, throttle } from 'lodash';

export default class Table {
  refTable: any;
  request: Ref<TZHTableRequest | undefined> | undefined;
  pageData: any;
  form: Form;
  tableSettings: Ref<TZHTableSetting>;
  emit: any;
  constructor(
    tableSettings: Ref<TZHTableSetting>,
    refTable: any,
    request: Ref<TZHTableRequest | undefined> | undefined,
    form: Form,
    pageData: Ref<TZHTablePage>,
    emit: any
  ) {
    this.tableSettings = tableSettings;
    this.refTable = refTable;
    this.request = request;
    this.pageData = pageData;
    this.form = form;
    this.emit = emit;
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
    // this.refTable.value.store.states.lazyTreeNodeMap.value = [];
    // 参数
    if (initPage) this.pageData.value.current = 1;
    const params = propParams || this.form.getSearchParams();
    const args: TZHRequestParams = {
      url: this.request?.value?.list?.url || '',
      conditions: params,
      successMessage: this.request?.value?.list?.successMessage,
      errorMessage: this.request?.value?.list?.errorMessage,
    };
    // console.log('params', params);
    // 获取数据
    const result: TZHTableRequestResult = await ZHRequest.post(args);
    // 处理数据
    if (result.success) {
      this.data.value = result.data.records || result.data;
      this.pageData.value.total = isNaN(Number(result.data.total)) ? 0 : Number(result.data.total);
    } else {
      this.data.value = [];
      this.pageData.value.total = 0;
    }
    this.loading.value = false;
  };

  debounceInitData = debounce(this.initData, 500);
  throttleInitData = throttle(this.initData, 1500);

  getData = () => { return this.data.value; };

  setData = (data: Array<any>) => { this.data.value = data; };

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
    const params: TZHRequestParams = {
      url: this.request?.value?.batchDelete?.url || '',
      conditions: {
        ids: selections.map((x: any) => x.id),
      },
    };
    const result: TZHTableRequestResult = await ZHRequest.post(params);
    if (result.success) {
      this.debounceInitData();
      this.refTable.value && this.refTable.value.clearSelection();
    }
  };

  loadMap = ref(new Map());

  load = (row: any, treeNode: any, resolve: (data: any[]) => void) => {
    this.tableSettings.value.load && this.tableSettings.value.load(row, treeNode, resolve);

    //将获取到的节点数据添加到loadMap变量中
    this.loadMap.value.set(row.id, { row, treeNode, resolve });
  };

  reloadTableTreeChild = (parentId: any) => {
    // parentId = parentId ? parseInt(parentId) : 0;
    if (!parentId || !this.loadMap.value.get(parentId)) return;
    const { row, treeNode, resolve } = this.loadMap.value.get(parentId);

    //通过ref获取table的子节点数
    if (!!this.refTable.value.store.states.lazyTreeNodeMap.value[parentId] && this.refTable.value.store.states.lazyTreeNodeMap.value[parentId].length > 1) {
      //说明该节点下有多个子节点
      this.refTable.value.store.states.lazyTreeNodeMap[parentId] = [];
    } else {
      //说明该节点只有一个节点
      this.refTable.value.store.states.lazyTreeNodeMap.value[parentId] =
        [];
    }

    this.load(row, treeNode, resolve);

  };

  rowDelete = async (row: any) => {
    const msgResult = await isMessageConfirm('确认删除？', '提示');
    if (!msgResult) return;
    const params: TZHRequestParams = {
      url: this.request?.value?.delete?.url || '',
      // conditions: { ...row },
      conditions: {
        ids: [row.id]
      },
    };
    const result: TZHTableRequestResult = await ZHRequest.post(params);
    if (result.success) {
      if (this.tableSettings.value.load && (this.tableSettings.value.validateLoad === undefined ? true : this.tableSettings.value.validateLoad(row))) {
        this.reloadTableTreeChild(row.parentId);
      } else {
        this.debounceInitData();
        this.refTable.value && this.refTable.value.clearSelection();
      }
    }
  };

  rowClick = async (row: any, column: any, event: any) => {
    if (this.tableSettings.value.rowClick) {
      if (typeof this.tableSettings.value.rowClick === 'string') {
        const func = new Function('params', this.tableSettings.value.rowClick);
        return func({ row, column, event });
      } else {
        this.tableSettings.value.rowClick({ row, column, event });
      }
    }
  };

  tableColumnConvert = (convert: string | Function, row: any, index: number) => {
    if (typeof convert === 'string') return (new Function('row, index', convert))(row, index);
    else return convert(row, index);
  };

  tableRowActionOnClick = (method: string | Function | undefined, row: any, index: number) => {
    if (!method) return;
    if (typeof method === 'string') {
      const func = new Function('row, index', method);
      return func(row, index);

    } else {
      return method(row, index);
    }
  };

  //#region 相关功能行内编辑
  cellMouseOver = ref(); // 鼠标移入到的单元格
  cellEditList = ref([] as Array<any>);
  _convertPropToEditingProp = (prop: string) => { return prop + 'editing'; };
  _convertEditingPropToProp = (editingProp: string) => { return editingProp.substring(0, editingProp.length - 7); };

  cellCanShowEdit = (scope: any) => {
    return this.cellMouseOver.value?.index === scope.$index &&
      this.cellMouseOver.value?.cellIndex === scope.cellIndex;
  };

  cellCanShowSaveCancel = (scope: any) => {
    return !(this.cellMouseOver.value?.index === scope.$index &&
      this.cellMouseOver.value?.cellIndex === scope.cellIndex) && this.cellEditList.value.find((x: any) => x.index === scope.$index && x.cellIndex === scope.cellIndex);
  };

  cellContentOver = (scope: any) => {
    if (this.cellCanShowSaveCancel(scope)) return;
    this.cellMouseOver.value = { index: scope.$index, cellIndex: scope.cellIndex };
  };

  cellContentLeave = (scope: any) => {
    this.cellMouseOver.value = null;
  };

  clickInlineEdit = (scope: any) => {
    this.cellMouseOver.value = null;
    this.cellEditList.value.push({ index: scope.$index, cellIndex: scope.cellIndex });
    scope.row[this._convertPropToEditingProp(scope.column.property)] = scope.row[scope.column.property];
  };

  clickInlineCancel = (scope: any) => {
    this.cellMouseOver.value = null;
    this.cellEditList.value = this.cellEditList.value.filter((x: any) => x.index !== scope.$index || x.cellIndex !== scope.cellIndex);
  };

  clickInlineSave = (scope: any) => {
    if (this.tableSettings.value.modal?.customValidate && !this.tableSettings.value.modal?.customValidate(scope.row)) return;
    // 调用接口触发
    popSuccessMessage('修改成功');
    scope.row[scope.column.property] = scope.row[this._convertPropToEditingProp(scope.column.property)];
    this.cellMouseOver.value = null;
    this.cellEditList.value = this.cellEditList.value.filter((x: any) => x.index !== scope.$index || x.cellIndex !== scope.cellIndex);
  };
  //#endregion
}
