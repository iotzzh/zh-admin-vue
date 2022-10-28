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
              'id|100000-999999': 9999999,
              name: 'test1',
              'sex|0-1': 0,
              'age|0-180': 180,
              phone: '12312312311',
              employeeNum: '12313',
              role: '开发'
            }
          ],
        },
      };
    },
  },
];
