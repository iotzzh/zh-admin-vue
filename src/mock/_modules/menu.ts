export default [
    // GetUserList
    {
        url: '/api/menu/list',
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
                        {
                            'id': '83065105051861051',
                            'systemId': '83065105051861055',
                            'parentId': '83065105051861055',
                            'permsionName': '首页',
                            'url': '/dashboard',
                            'filePath': 'views/dashboard/index',
                            'menuType': 2,
                            'permsionCode': 'NJHS:/publicSystems/authorityManagement',
                            'sourceBy': null,
                            'sortNo': 1,
                            'icon': 'icon-menu',
                            'description': null,
                            'isEbl': 1,
                            'isDel': 0,
                        },
                        {
                          'id': '83065105051861056',
                          'systemId': '83065105051861055',
                          'parentId': '83065105051861055',
                          'permsionName': '权限管理',
                          'url': '/authorityManagement',
                          'menuType': 1,
                          'permsionCode': 'NJHS:/publicSystems/authorityManagement',
                          'sourceBy': null,
                          'sortNo': 1,
                          'icon': 'icon-menu',
                          'description': null,
                          'isEbl': 1,
                          'isDel': 0,
                          'children': [
                            {
                              'id': '83065799775404096',
                              'systemId': '83065105051861055',
                              'parentId': '83065105051861056',
                              'permsionName': '用户管理',
                              'url': '/userManagement',
                              'routeName': 'userManagement',
                              'filePath': 'views/authorityManagement/userManagement',
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
                              'id': '83066220518621248',
                              'systemId': '83065105051861055',
                              'parentId': '83065105051861056',
                              'permsionName': '角色管理',
                              'url': '/roleManagement',
                              'filePath': 'views/authorityManagement/roleManagement',
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
                                'id': '83066220518621248',
                                'systemId': '83065105051861055',
                                'parentId': '83065105051861056',
                                'permsionName': '组织管理',
                                'url': '/organizationalStructure',
                                'filePath': 'views/authorityManagement/organizationalStructure',
                                'menuType': 2,
                                'permsionCode': 'NJHS:/publicSystems/authorityManagement/organizationalStructure',
                                'sourceBy': null,
                                'sortNo': 2,
                                'icon': 'iconfont icondingdan',
                                'description': '经理销售代表等',
                                'isEbl': 1,
                                'isDel': 0,
                              },
                              {
                                'id': '83066220518621248',
                                'systemId': '83065105051861055',
                                'parentId': '83065105051861056',
                                'permsionName': '菜单管理',
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
                          ]
                        },
                    ],
                },
            };

            return result;
        },
    },
    {
        url: '/api/menu/update',
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
        url: '/api/menu/add',
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
        url: '/api/menu/delete',
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
