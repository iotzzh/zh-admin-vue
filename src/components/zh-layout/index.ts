import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { TZHLayoutConfig, TZHLayoutItem } from './type';

interface TParams {
  config: TZHLayoutConfig | undefined;
  emit: (event: 'update:config' | 'layoutChange', ...args: any[]) => void;
}

export default class Layout {
  private emit: (event: 'update:config' | 'layoutChange', ...args: any[]) => void;
  private config: TZHLayoutConfig | undefined;
  private windowResizeHandler: () => void;
  
  public currentLayoutItems = ref<TZHLayoutItem[]>([]);
  public currentScreenSize = ref<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('xl');
  
  constructor(params: TParams) {
    this.emit = params.emit;
    this.config = params.config;
    
    // 初始化布局项
    this.initLayoutItems();
    
    // 设置窗口大小变化处理函数
    this.windowResizeHandler = this.handleWindowResize.bind(this);
  }
  
  /**
   * 初始化布局项
   */
  private initLayoutItems() {
    if (this.config && this.config.items) {
      this.currentLayoutItems.value = this.config.items.map(item => 
        this.processLayoutItem(item)
      );
    }
  }
  
  /**
   * 处理单个布局项
   */
  private processLayoutItem(item: TZHLayoutItem): TZHLayoutItem {
    // 深拷贝以避免直接修改原始数据
    const processedItem = { ...item };
    
    // 如果有子项，递归处理
    if (item.children && item.children.length > 0) {
      processedItem.children = item.children.map(child => 
        this.processLayoutItem(child)
      );
    }
    
    return processedItem;
  }
  
  /**
   * 更新配置
   */
  public updateConfig(newConfig: TZHLayoutConfig | undefined) {
    this.config = newConfig;
    this.initLayoutItems();
    this.emit('layoutChange', this.currentLayoutItems.value);
  }
  
  /**
   * 计算当前屏幕大小
   */
  private getCurrentScreenSize(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' {
    const width = window.innerWidth;
    if (width >= 1920) return 'xl';
    if (width >= 1200) return 'lg';
    if (width >= 992) return 'md';
    if (width >= 768) return 'sm';
    return 'xs';
  }
  
  /**
   * 处理窗口大小变化
   */
  private handleWindowResize() {
    const newScreenSize = this.getCurrentScreenSize();
    if (newScreenSize !== this.currentScreenSize.value) {
      this.currentScreenSize.value = newScreenSize;
      this.emit('layoutChange', this.currentLayoutItems.value);
    }
  }
  
  /**
   * 监听窗口大小变化
   */
  public startListeningWindowResize() {
    onMounted(() => {
      this.currentScreenSize.value = this.getCurrentScreenSize();
      window.addEventListener('resize', this.windowResizeHandler);
    });
    
    onUnmounted(() => {
      window.removeEventListener('resize', this.windowResizeHandler);
    });
  }
  
  /**
   * 获取布局项的列数
   */
  public getColumnSpan(item: TZHLayoutItem): number {
    const screenSize = this.currentScreenSize.value;
    
    // 根据当前屏幕大小获取对应的列数
    switch (screenSize) {
      case 'xl':
        return item.xl || item.span || 24;
      case 'lg':
        return item.lg || item.span || 24;
      case 'md':
        return item.md || item.span || 24;
      case 'sm':
        return item.sm || item.span || 24;
      case 'xs':
        return item.xs || item.span || 24;
      default:
        return item.span || 24;
    }
  }
  
  /**
   * 根据ID获取布局项
   */
  public getLayoutItemById(id: string): TZHLayoutItem | null {
    const findItem = (items: TZHLayoutItem[]): TZHLayoutItem | null => {
      for (const item of items) {
        if (item.id === id) {
          return item;
        }
        if (item.children && item.children.length > 0) {
          const found = findItem(item.children);
          if (found) return found;
        }
      }
      return null;
    };
    
    return this.currentLayoutItems.value.length > 0 
      ? findItem(this.currentLayoutItems.value) 
      : null;
  }
}