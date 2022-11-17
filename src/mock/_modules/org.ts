import { randomUUID } from 'crypto';
import Mock from 'mockjs';
export default [
    // GetUserList
    {
        url: '/api/org/list',
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
                        // { id: 1, label: 'test1', age: 18, parent: 0 },
                        // { id: 1.1, label: 'test1.1', age: 2, parent: 1 },
                        // { id: 1.2, label: 'test1.2', age: 12, parent: 1 },
                        // { id: 1.21, label: 'test1.2.1', age: 121, parent: 1.2 },
                        // { id: 2, label: 'test2', age: 28, parent: 0 },
                        // { id: 2.1, label: 'test2.1', age: 22, parent: 2 },
                        // { id: 2.2, label: 'test2.2', age: 22, parent: 2 },
                        // { id: 2.21, label: 'test2.2.1', age: 221, parent: 2.2 },
                    ],
                },
            };

            return result;
        },
    },
    {
        url: '/api/org/update',
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
                        { id: 1, name: 'test1', age: 18, parent: null },
                        { id: 1.1, name: 'test1.1', age: 2, parent: 1 },
                        { id: 1.2, name: 'test1.2', age: 12, parent: 1 },
                        { id: 1.21, name: 'test1.2.1', age: 121, parent: 1.2 },
                        { id: 2, name: 'test2', age: 28, parent: null },
                        { id: 2.1, name: 'test2.1', age: 22, parent: 2 },
                        { id: 2.2, name: 'test2.2', age: 22, parent: 2 },
                        { id: 2.21, name: 'test2.2.1', age: 221, parent: 2.2 },
                    ],
                },
            };

            return result;
        },
    },
    {
        url: '/api/org/add',
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
                        { id: 1, name: 'test1', age: 18, parent: null },
                        { id: 1.1, name: 'test1.1', age: 2, parent: 1 },
                        { id: 1.2, name: 'test1.2', age: 12, parent: 1 },
                        { id: 1.21, name: 'test1.2.1', age: 121, parent: 1.2 },
                        { id: 2, name: 'test2', age: 28, parent: null },
                        { id: 2.1, name: 'test2.1', age: 22, parent: 2 },
                        { id: 2.2, name: 'test2.2', age: 22, parent: 2 },
                        { id: 2.21, name: 'test2.2.1', age: 221, parent: 2.2 },
                    ],
                },
            };

            return result;
        },
    },
    {
        url: '/api/org/delete',
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
                        { id: 1, name: 'test1', age: 18, parent: null },
                        { id: 1.1, name: 'test1.1', age: 2, parent: 1 },
                        { id: 1.2, name: 'test1.2', age: 12, parent: 1 },
                        { id: 1.21, name: 'test1.2.1', age: 121, parent: 1.2 },
                        { id: 2, name: 'test2', age: 28, parent: null },
                        { id: 2.1, name: 'test2.1', age: 22, parent: 2 },
                        { id: 2.2, name: 'test2.2', age: 22, parent: 2 },
                        { id: 2.21, name: 'test2.2.1', age: 221, parent: 2.2 },
                    ],
                },
            };
            return result;
        },
    },
];
