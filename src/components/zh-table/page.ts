import { Ref, ref } from 'vue';
import { TZHTablePage, TZHTablePageSetting } from './type';
import Table from './table';
import storage from '@/utils/storage';

export default class {
  pageSettings: TZHTablePageSetting | undefined;
  sizes: any;
  pagerCount: any;
  total: any;
  layout: any;
  pageData: any;
  table: Table;
  constructor(
    pageSettings: TZHTablePageSetting | undefined,
    pageData: Ref<TZHTablePage>,
    table: Table) {
    const isMobile = storage.getIsMobile();
    this.sizes = ref(pageSettings?.sizes || [10, 20, 50, 100]);
    this.pagerCount = ref(pageSettings?.pagerCount || 5);
    this.total = ref(pageData.value.total);
    this.layout = isMobile ? ref(pageSettings?.layout || 'total, prev, sizes, next') : ref(pageSettings?.layout || 'total, sizes, prev, pager, next, jumper');
    this.pageData = pageData;
    this.table = table;
  }

  handleCurrentChange = (val: number) => {
    this.table.debounceInitData(null, false);
  };
}