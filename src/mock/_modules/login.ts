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
                        { calCode: '001', calName: '001', },
                        { calCode: '002', calName: '002', }
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
                        { calCode: '001', calName: '001', },
                        { calCode: '002', calName: '002', }
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
                    {
                        'id': '83065105051861056123111',
                        'systemId': '83065105051861055123',
                        'parentId': '001',
                        'permsionName': '客户管理',
                        'url': '/clientManagement',
                        'menuType': 1,
                        'permsionCode': 'NJHS:clientManagement',
                        'sourceBy': null,
                        'sortNo': 3,
                        'icon': 'icon-menu',
                        'description': null,
                        'isEbl': 1,
                        'isDel': 0,
                    },
                    {
                        'id': '83065799775404096312212223333322222222',
                        'systemId': '830651050518610552222222222222',
                        'parentId': '83065105051861056123111',
                        'permsionName': '客户类别管理',
                        'url': '/clientClassManagement',
                        'routeName': 'clientClassManagement',
                        'filePath': 'views/clientManagement/clientClassManagement',
                        'menuType': 2,
                        'permsionCode': 'NJHS:/publicSystems/authorityManagement/clientClassManagement',
                        'sourceBy': null,
                        'sortNo': 1,
                        'icon': 'menu',
                        'description': null,
                        'isEbl': 1,
                        'isDel': 0,
                    },
                    {
                        'id': '8306579977540409612221222',
                        'systemId': '8306510505186105522',
                        'parentId': '83065105051861056123111',
                        'permsionName': '客户连锁管理',
                        'url': '/clientChainManagement',
                        'routeName': 'userManagement34',
                        'filePath': 'views/clientManagement/clientChainManagement',
                        'menuType': 2,
                        'permsionCode': 'NJHS:clientManagement/clientChainManagement',
                        'sourceBy': null,
                        'sortNo': 1,
                        'icon': 'menu',
                        'description': null,
                        'isEbl': 1,
                        'isDel': 0,
                    },
                    {
                        'id': '830657997754040963122122233333',
                        'systemId': '8306510505186105522',
                        'parentId': '83065105051861056123111',
                        'permsionName': '客户管理',
                        'url': '/clientManagement',
                        'routeName': 'userManagement5',
                        'filePath': 'views/clientManagement/clientManagement',
                        'menuType': 2,
                        'permsionCode': 'NJHS:/publicSystems/authorityManagement/clientManagement',
                        'sourceBy': null,
                        'sortNo': 1,
                        'icon': 'menu',
                        'description': null,
                        'isEbl': 1,
                        'isDel': 0,
                    },
                    {
                        'id': '83065105051861056123',
                        'systemId': '83065105051861055123',
                        'parentId': '001',
                        'permsionName': '医生管理',
                        'url': '/doctorManagement',
                        'menuType': 1,
                        'permsionCode': 'NJHS:/publicSystems/authorityManagement',
                        'sourceBy': null,
                        'sortNo': 4,
                        'icon': 'icon-menu',
                        'description': null,
                        'isEbl': 1,
                        'isDel': 0,
                    },
                    {
                        'id': '830657997754040961221',
                        'systemId': '8306510505186105522',
                        'parentId': '83065105051861056123',
                        'permsionName': '医生诊室管理',
                        'url': '/doctorOfficeManagement',
                        'routeName': 'doctorOfficeManagement6',
                        'filePath': 'views/doctorManagement/doctorOfficeManagement',
                        'menuType': 2,
                        'permsionCode': 'NJHS:/publicSystems/authorityManagement/userManagement',
                        'sourceBy': null,
                        'sortNo': 1,
                        'icon': 'menu',
                        'description': null,
                        'isEbl': 1,
                        'isDel': 0,
                    },
                    {
                        'id': '8306510505186105612322',
                        'systemId': '8306510505186105512322',
                        'parentId': '001',
                        'permsionName': '订单管理',
                        'url': '/orderManagement',
                        'menuType': 1,
                        'permsionCode': 'NJHS:/publicSystems/authorityManagement',
                        'sourceBy': null,
                        'sortNo': 5,
                        'icon': 'icon-menu',
                        'description': null,
                        'isEbl': 1,
                        'isDel': 0,
                    },
                    {
                        'id': '830657997754040961221',
                        'systemId': '8306510505186105522',
                        'parentId': '8306510505186105612322',
                        'permsionName': '订单查询',
                        'url': '/inspectionOrderManagement',
                        'routeName': 'inspectionOrderManagement',
                        'filePath': 'views/orderManagement/inspectionOrderManagement',
                        'menuType': 2,
                        'permsionCode': 'NJHS:/publicSystems/authorityManagement/userManagement',
                        'sourceBy': null,
                        'sortNo': 1,
                        'icon': 'menu',
                        'description': null,
                        'isEbl': 1,
                        'isDel': 0,
                    },
                    {
                        'id': '830657997754040961222222221',
                        'systemId': '8306510505186105522',
                        'parentId': '8306510505186105612322',
                        'permsionName': '订单修改',
                        'url': '/inspectionOrderUpdateManagement',
                        'routeName': 'userManagement123',
                        'filePath': 'views/orderManagement/inspectionOrderUpdateManagement',
                        'menuType': 2,
                        'permsionCode': 'NJHS:/publicSystems/authorityManagement/userManagement',
                        'sourceBy': null,
                        'sortNo': 2,
                        'icon': 'menu',
                        'description': null,
                        'isEbl': 1,
                        'isDel': 0,
                    },
                    {
                        'id': '83065799775404096122211111122222221',
                        'systemId': '83065799775404096122211111122222221',
                        'parentId': '001',
                        'permsionName': '报告查询',
                        'url': '/doctorOfficeManagement',
                        'routeName': 'doctorOfficeManagement6',
                        'filePath': 'views/doctorManagement/doctorOfficeManagement',
                        'menuType': 1,
                        'permsionCode': 'NJHS:/publicSystems/authorityManagement/userManagement',
                        'sourceBy': null,
                        'sortNo': 7,
                        'icon': 'icon-menu',
                        'description': null,
                        'isEbl': 1,
                        'isDel': 0,
                    },
                    {
                        'id': '83065799775404096122211112222211221111111',
                        'systemId': '8306510505186105522',
                        'parentId': '83065799775404096122211111122222221',
                        'permsionName': '报告查询',
                        'url': '/reportManagement',
                        'routeName': 'userManagement234',
                        'filePath': 'views/orderManagement/reportManagement',
                        'menuType': 2,
                        'permsionCode': 'NJHS:/publicSystems/authorityManagement/userManagement',
                        'sourceBy': null,
                        'sortNo': 1,
                        'icon': 'icon-menu',
                        'description': null,
                        'isEbl': 1,
                        'isDel': 0,
                    },
                ],
            };

            return result;
        },
    },
];
