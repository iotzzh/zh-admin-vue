import { randomUUID } from 'crypto';
import Mock from 'mockjs';
export default [
    // GetUserList
    {
        url: '/apiMock/org/list',
        type: 'post',
        response: (conditions: any) => {
            const result = {
                success: true,
                errorCode: '',
                errorMessage: '',
                exceptionMessage: '',
                data: {
                    total: 110,
                    records: [
                        { id: 1, label: '南京', age: 18, parent: 0 },
                        { id: 1.1, label: '江宁', age: 2, parent: 1 },
                        { id: 1.2, label: '江北', age: 12, parent: 1 },
                        { id: 1.21, label: '高新区', age: 121, parent: 1.2 },
                        { id: 2, label: '蚌埠', age: 28, parent: 0 },
                        { id: 2.1, label: '蚌山区', age: 22, parent: 2 },
                        { id: 2.2, label: '桥北', age: 22, parent: 2 },
                        { id: 2.21, label: '淮上区', age: 221, parent: 2.2 }
                    ],
                },
            };

            return result;
        },
    },
    {
        url: '/apiMock/org/update',
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
        url: '/apiMock/org/add',
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
        url: '/apiMock/org/delete',
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
