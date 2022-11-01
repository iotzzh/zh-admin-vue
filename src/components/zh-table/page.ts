import { Ref, ref } from 'vue';
import { TPage, TPageSetting } from './type';
import Table from './table';

export default class {
  pageSettings: TPageSetting | undefined;
  sizes: any;
  pagerCount: any;
  total: any;
  layout: any;
  pageData: any;
  table: Table;
  constructor(
    pageSettings: TPageSetting | undefined, 
    pageData: Ref<TPage>,
    table: Table) {
    this.sizes = ref(pageSettings?.sizes || [10, 20, 50, 100]);
    this.pagerCount = ref(pageSettings?.pagerCount || 5);
    this.total = ref(pageData.value.total);
    this.layout = ref(pageSettings?.layout || 'total, sizes, prev, pager, next, jumper');
    this.pageData = pageData;
    this.table = table;
  }

  handleCurrentChange = (val: number) => {
    this.table.debounceInitData(null, false);
  };
}