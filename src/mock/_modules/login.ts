export default [
    // 登录接口
    {
        url: '/apiMock/login/index',
        type: 'get',
        response: (conditions: any) => {
            const result = {
                success: true,
                errorCode: '',
                errorMessage: '',
                exceptionMessage: '',
                data: {
                    token: '12313',
                    orgstaFullName: 'zzh',
                    realName: '张中华',
                    userCalList: [
                        { calCode: '001', calName: '机构一', },
                        { calCode: '002', calName: '机构二', }
                    ],
                },
            };

            return result;
        },
    },
    // 切换用户环境/机构
    {
        url: '/apiMock/login/changeCal',
        type: 'post',
        response: (conditions: any) => {
            const result = {
                success: true,
                errorCode: '',
                errorMessage: '',
                exceptionMessage: '',
                data: {
                    token: '12313',
                    orgstaFullName: 'zzh',
                    userCalList: [
                        { calCode: '001', calName: '机构一', },
                        { calCode: '002', calName: '机构二', }
                    ],
                },
            };

            return result;
        },
    },
    // 获取通用/全局信息
    {
        url: '/apiMock/permission/findCalRootPermission',
        type: 'post',
        response: (conditions: any) => {
            const result = {
                success: true,
                errorCode: '',
                errorMessage: '',
                exceptionMessage: '',
                data: {
                    id: '001',
                },
            };

            return result;
        },
    },
    {
        url: '/apiMock/login/getMenus',
        type: 'get',
        response: (conditions: any) => {
            const result = {
                success: true,
                errorCode: '',
                errorMessage: '',
                exceptionMessage: '',
                data: [
                    {
                        'id': '0011',
                        'systemId': '001',
                        'parentId': '001',
                        'permsionName': '首页',
                        'url': '/dashboard',
                        'filePath': 'views/dashboard/index',
                        'menuType': 1,
                        'permsionCode': 'dashboard',
                        'sourceBy': null,
                        'sortNo': 1,
                        'icon': 'icon-menu',
                        'description': null,
                        'isEbl': 1,
                        'isDel': 0,
                    },
                    {
                        'id': '002',
                        'systemId': '002',
                        'parentId': '001',
                        'permsionName': '权限管理',
                        'url': '/authorityManagement',
                        'menuType': 1,
                        'permsionCode': 'NJHS:/publicSystems/authorityManagement',
                        'sourceBy': null,
                        'sortNo': 2,
                        'icon': 'icon-menu',
                        'description': null,
                        'isEbl': 1,
                        'isDel': 0,
                    },
                    {
                        'id': '0021',
                        'systemId': '0021',
                        'parentId': '002',
                        'permsionName': '用户管理',
                        'url': '/userManagement',
                        'routeName': 'userManagement',
                        'filePath': 'views/authorityManagement/userManagement',
                        'menuType': 2,
                        'permsionCode': 'NJHS:/authorityManagement/userManagement',
                        'sourceBy': null,
                        'sortNo': 1,
                        'icon': 'menu',
                        'description': null,
                        'isEbl': 1,
                        'isDel': 0,
                    },
                    {
                        'id': '0022',
                        'systemId': '0022',
                        'parentId': '002',
                        'permsionName': '角色管理',
                        'url': '/roleManagement',
                        'filePath': 'views/authorityManagement/roleManagement',
                        'routeName': 'roleManagement',
                        'menuType': 2,
                        'permsionCode': 'NJHS:/publicSystems/authorityManagement/roleManagement',
                        'sourceBy': null,
                        'sortNo': 2,
                        'icon': 'iconfont icondingdan',
                        'description': '经理销售代表等',
                        'isEbl': 1,
                        'isDel': 0,
                    },
                    {
                        'id': '0023',
                        'systemId': '0023',
                        'parentId': '002',
                        'permsionName': '菜单管理',
                        'routeName': 'userManagement2',
                        'url': '/menuManagement',
                        'filePath': 'views/authorityManagement/menuManagement',
                        'menuType': 2,
                        'permsionCode': 'NJHS:/publicSystems/authorityManagement/menuManagement',
                        'sourceBy': null,
                        'sortNo': 2,
                        'icon': 'iconfont icondingdan',
                        'description': '经理销售代表等',
                        'isEbl': 1,
                        'isDel': 0,
                    },
                ],
            };

            return result;
        },
    },
];
