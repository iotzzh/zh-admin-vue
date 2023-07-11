import Mock from 'mockjs';

export default [
  {
    url: '/apiMock/department/list',
    type: 'post',
    response: (conditions: any) => {
      const result:any = {
        success: true,
        errorCode: '',
        errorMessage: '',
        exceptionMessage: '',
        data: {
          total: 20,
        },
      };

        result.data = [
        {
            id: '1',
            departmentName: '南京',
            sort: 1, 
            status: 1,
            createTime: '2023-01-02 18:33:33',
            comment: '测试备注',
            parentId: null
        },
        {
            id: '1.1',
            departmentName: '研发部',
            sort: 1, 
            status: 0,
            createTime: '2023-01-02 18:33:33',
            comment: '测试备注',
            parentId: '1'
        },
      ];

      return result;
    },
  },
  {
    url: '/apiMock/department/update',
    type: 'post',
    response: () => {
      return {
        success: true,
        errorCode: '',
        errorMessage: '',
        exceptionMessage: '',
      };
    },
  },
  {
    url: '/apiMock/department/add',
    type: 'post',
    response: () => {
      return {
        success: true,
        errorCode: '',
        errorMessage: '',
        exceptionMessage: '',
      };
    },
  },
  {
    url: '/apiMock/department/delete',
    type: 'post',
    response: () => {
      return {
        success: true,
        errorCode: '',
        errorMessage: '',
        exceptionMessage: '',
      };
    },
  },
  {
    url: '/apiMock/department/batchDelete',
    type: 'post',
    response: () => {
      return {
        success: true,
        errorCode: '',
        errorMessage: '',
        exceptionMessage: '',
      };
    },
  },
];
