import routeData from '@/router/routes/index';
export default [
    {
        url: '/apiMock/route/list',
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
];
