import routeData from '@/router/routes/index';
export default [
    // GetUserList
    {
        url: '/apiMock/menu/list',
        type: 'post',
        response: (conditions: any) => {
            const result = {
                success: true,
                errorCode: '',
                errorMessage: '',
                exceptionMessage: '',
                data: {
                    total: 110,
                    records: routeData,
                },
            };

            return result;
        },
    },
    {
        url: '/apiMock/menu/update',
        type: 'post',
        response: () => {
            const result = {
                success: true,
                errorCode: '',
                errorMessage: '',
                exceptionMessage: '',
                data: {
                    total: 110,
                    records: [
                        // { id: 1, name: '目录1', age: 18, parent: null },
                        // { id: 1.1, name: '目录1.1', age: 2, parent: 1 },
                        // { id: 1.2, name: '目录1.2', age: 12, parent: 1 },
                        // { id: 1.21, name: '目录1.2.1', age: 121, parent: 1.2 },
                        // { id: 2, name: '目录2', age: 28, parent: null },
                        // { id: 2.1, name: '目录2.1', age: 22, parent: 2 },
                        // { id: 2.2, name: '目录2.2', age: 22, parent: 2 },
                        // { id: 2.21, name: '目录2.2.1', age: 221, parent: 2.2 },
                    ],
                },
            };

            return result;
        },
    },
    {
        url: '/apiMock/menu/add',
        type: 'post',
        response: () => {
            const result = {
                success: true,
                errorCode: '',
                errorMessage: '',
                exceptionMessage: '',
                data: {
                    total: 110,
                    records: [
                        { id: 1, name: '目录1', age: 18, parent: null },
                        { id: 1.1, name: '目录1.1', age: 2, parent: 1 },
                        { id: 1.2, name: '目录1.2', age: 12, parent: 1 },
                        { id: 1.21, name: '目录1.2.1', age: 121, parent: 1.2 },
                        { id: 2, name: '目录2', age: 28, parent: null },
                        { id: 2.1, name: '目录2.1', age: 22, parent: 2 },
                        { id: 2.2, name: '目录2.2', age: 22, parent: 2 },
                        { id: 2.21, name: '目录2.2.1', age: 221, parent: 2.2 },
                    ],
                },
            };

            return result;
        },
    },
    {
        url: '/apiMock/menu/delete',
        type: 'post',
        response: () => {
            const result = {
                success: true,
                errorCode: '',
                errorMessage: '',
                exceptionMessage: '',
                data: {
                    total: 110,
                    records: [
                        { id: 1, name: '目录1', age: 18, parent: null },
                        { id: 1.1, name: '目录1.1', age: 2, parent: 1 },
                        { id: 1.2, name: '目录1.2', age: 12, parent: 1 },
                        { id: 1.21, name: '目录1.2.1', age: 121, parent: 1.2 },
                        { id: 2, name: '目录2', age: 28, parent: null },
                        { id: 2.1, name: '目录2.1', age: 22, parent: 2 },
                        { id: 2.2, name: '目录2.2', age: 22, parent: 2 },
                        { id: 2.21, name: '目录2.2.1', age: 221, parent: 2.2 },
                    ],
                },
            };
            return result;
        },
    },
];
