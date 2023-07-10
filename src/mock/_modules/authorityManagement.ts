import { randomUUID } from 'crypto';
import Mock from 'mockjs';

export default [
  // GetroleList
  {
    url: '/apiMock/role/list',
    type: 'post',
    response: (conditions: any) => {
      const result = {
        success: true,
        errorCode: '',
        errorMessage: '',
        exceptionMessage: '',
        data: {
          total: 20,
        },
      };

      result.data[`records|${(conditions.body && JSON.parse(conditions.body).size) || 20}`] = [
        // result.data[`records|${1000}`] = [
        {
          'id|+1': Math.round(new Date() as any), // 加一
          roleName: '@cname', // 随机姓名
          'isEbl|0-1': 0, // 0-1随机
          'description': '@string', // 0-1随机
        }
      ];

      return result;
    },
  },
  {
    url: '/apiMock/role/update',
    type: 'post',
    response: () => {
      return {
        success: true,
        errorCode: '',
        errorMessage: '',
        exceptionMessage: '',
        data: {
          total: 110,
          'records|10': [
            {
              'id|+1': 100000, // 加一
              name: '@cname', // 随机姓名
              'sex|0-1': 0, // 0-1随机
              'age|0-180': 180, // 0-180随机
              phone: '@phone',
              employeeNum: '@workNumber',
              'role|1': ['产品', '开发', '测试', '运营'], //数组中的一个，随机的
            }
          ],
        },
      };
    },
  },
  {
    url: '/apiMock/role/add',
    type: 'post',
    response: () => {
      return {
        success: true,
        errorCode: '',
        errorMessage: '',
        exceptionMessage: '',
        data: {
          total: 111,
          'records|10': [
            {
              'id|+1': 100000, // 加一
              name: '@cname', // 随机姓名
              'sex|0-1': 0, // 0-1随机
              'age|0-180': 180, // 0-180随机
              phone: '@phone',
              employeeNum: '@workNumber',
              'role|1': ['产品', '开发', '测试', '运营'], //数组中的一个，随机的
            }
          ],
        },
      };
    },
  },
  {
    url: '/apiMock/role/delete',
    type: 'post',
    response: () => {
      return {
        success: true,
        errorCode: '',
        errorMessage: '',
        exceptionMessage: '',
        data: {
          total: 109,
          'records|10': [
            {
              'id|+1': 100000, // 加一
              name: '@cname', // 随机姓名
              'sex|0-1': 0, // 0-1随机
              'age|0-180': 180, // 0-180随机
              phone: '@phone',
              employeeNum: '@workNumber',
              'role|1': ['产品', '开发', '测试', '运营'], //数组中的一个，随机的
            }
          ],
        },
      };
    },
  },
  {
    url: '/apiMock/role/batchDelete',
    type: 'post',
    response: () => {
      return {
        success: true,
        errorCode: '',
        errorMessage: '',
        exceptionMessage: '',
        data: {
          total: 105,
          'records|5': [
            {
              'id|+1': 100000, // 加一
              name: '@cname', // 随机姓名
              'sex|0-1': 0, // 0-1随机
              'age|0-180': 180, // 0-180随机
              phone: '@phone',
              employeeNum: '@workNumber',
              'role|1': ['产品', '开发', '测试', '运营'], //数组中的一个，随机的
            }
          ],
        },
      };
    },
  },
];
