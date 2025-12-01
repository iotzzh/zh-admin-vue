import { CSSProperties } from 'vue';

/**
 * 布局项配置接口
 */
export interface TZHLayoutItem {
  /**
   * 布局项唯一标识符
   */
  id: string;
  
  /**
   * 布局项类型，如 'header', 'aside', 'main', 'footer', 'section', 'div' 等
   */
  type?: string;
  
  /**
   * 布局项所占列数
   */
  span?: number;
  
  /**
   * xl屏幕下的列数
   */
  xl?: number;
  
  /**
   * lg屏幕下的列数
   */
  lg?: number;
  
  /**
   * md屏幕下的列数
   */
  md?: number;
  
  /**
   * sm屏幕下的列数
   */
  sm?: number;
  
  /**
   * xs屏幕下的列数
   */
  xs?: number;
  
  /**
   * 布局项的样式
   */
  style?: CSSProperties;
  
  /**
   * 布局项的类名
   */
  className?: string;
  
  /**
   * 子布局项
   */
  children?: TZHLayoutItem[];
  
  /**
   * 是否使用flex布局
   */
  flex?: boolean;
  
  /**
   * flex布局的方向
   */
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  
  /**
   * flex布局的对齐方式
   */
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  
  /**
   * flex布局的 justify-content
   */
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  
  /**
   * 是否隐藏
   */
  hidden?: boolean;
  
  /**
   * 布局项的自定义属性
   */
  [key: string]: any;
}

/**
 * 布局配置接口
 */
export interface TZHLayoutConfig {
  /**
   * 布局类型，如 'grid', 'flex' 等
   */
  type?: string;
  
  /**
   * 总列数
   */
  totalColumns?: number;
  
  /**
   * 布局项数组
   */
  items?: TZHLayoutItem[];
  
  /**
   * 布局的样式
   */
  style?: CSSProperties;
  
  /**
   * 布局的类名
   */
  className?: string;
  
  /**
   * 布局的自定义属性
   */
  [key: string]: any;
}