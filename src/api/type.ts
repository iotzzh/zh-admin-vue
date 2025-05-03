export interface TApiItem {
  // API显示名称
  label: string;
  // API英文名称
  name: string;
  // 前缀
  prefix?: string;
  // 本地开发环境前缀: 在本地开发时，根据此配置优先
  localPrefix?: string;
  // 是否使用mock数据
  useMock?: boolean;
  // 使用本地开发环境时是否使用mock数据: 在本地开发时，根据此配置优先
  localUseMock?: boolean;
  // 请求地址
  url?: string;
  // 子API
  api?: TApiItem[];
}

export interface TApiModules {
  [key: string]: () => Promise<{ default: TApiItem }>;
}

export interface TApiMap {
  [key: string]: string;
}
