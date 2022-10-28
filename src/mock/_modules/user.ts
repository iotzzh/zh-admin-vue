import { randomUUID } from 'crypto';
import Mock from 'mockjs';
export default [
  // GetUserList
  {
    url: '/api/user/list',
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
              'role|1':['产品','开发', '测试', '运营'], //数组中的一个，随机的
            }
          ],
        },
      };
    },
  },
];
