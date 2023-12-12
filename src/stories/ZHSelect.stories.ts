import type { Meta, StoryObj } from '@storybook/vue3';

import ZHSelect from '../components/zh-select/index.vue';
import { ref } from 'vue';
import api from '@/api/authorityManagement';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof ZHSelect> = {
  title: 'Example/ZHSelect',
  component: ZHSelect,
  parameters: {
    componentSubtitle: '基于element plus二次封装，支持值为简单类型和复杂类型，支持api自动请求，支持自动远程搜索, 支持通过id或者其他唯一值回显选中对象',
  },
  render: (args: any) => ({
    components: { ZHSelect },
    setup() {
      const value = ref();
      return { value, args };
    },
    template: `
      <div>
      <ZHSelect 
        v-model="value" 
        :defaultOptions="args.defaultOptions"
        :labelField="args.labelField"
        :valueField="args.valueField"
        :valueKey="args.valueKey"
        :api="args.api"
        :remote="args.remote"
        :filterable="args.filterable"
        />
      选中值：{{ value }}
      </div>`,
  }),
  tags: ['autodocs'],
  args: { effect: 'light' }, // default value
};

export default meta;
type Story = StoryObj<typeof ZHSelect>;

const value = ref({} as { [x: string]: any });
export const 基础用法: Story = {
  // name: 'test',
  args: {
    modelValue: value,
    defaultOptions: [
      { label: '测试', value: '测试' },
      { label: '测试1', value: '测试1' },
    ],
    width: '200px',
  },
};

export const 对象V: Story = {
  args: {
    modelValue: value,
    labelField: 'label1',
    valueField: 'id',
    defaultOptions: [
      { label1: '测试', value1: '测试', id: 1 },
      { label1: '测试1', value1: '测试1', id: 2 },
    ],
    width: '200px',
  },
};

export const 对象O: Story = {
  args: {
    modelValue: value,
    valueKey: 'id',
    labelField: 'label1',
    valueField: 'id',
    defaultOptions: [
      { label1: '测试', value1: '测试', id: 1 },
      { label1: '测试1', value1: '测试1', id: 2 },
    ],
    width: '200px',
  },
};

export const api请求: Story = {
  args: {
    modelValue: value,
    api: api.getRouteList,
    valueKey: 'id',
    labelField: 'routeName',
    valueField: 'id',
    defaultOptions: [],
    width: '200px',
  },
};

export const 过滤: Story = {
  args: {
    modelValue: value,
    api: api.getRouteList,
    filterable: true,
    valueKey: 'id',
    labelField: 'routeName',
    valueField: 'id',
    defaultOptions: [],
    width: '200px',
  },
};

export const 远程搜索: Story = {
  args: {
    modelValue: value,
    api: api.getRouteList,
    remote: true,
    valueKey: 'id',
    labelField: 'routeName',
    valueField: 'id',
    defaultOptions: [],
    width: '200px',
  },
};
