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
                    records: [
                        {
                            'id': '001',
                            'systemId': '001',
                            'parentId': '0',
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
                          'parentId': '0',
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
                          ]
                        },
                        {
                          'id': '83065105051861056123111',
                          'systemId': '83065105051861055123',
                          'parentId': '830651050518610552',
                          'permsionName': '客户管理',
                          'url': '/clientManagement',
                          'menuType': 1,
                          'permsionCode': 'NJHS:clientManagement',
                          'sourceBy': null,
                          'sortNo': 1,
                          'icon': 'icon-menu',
                          'description': null,
                          'isEbl': 1,
                          'isDel': 0,
                          'children': [
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
                          ]
                        },
                        {
                            'id': '83065105051861056123',
                            'systemId': '83065105051861055123',
                            'parentId': '8306510505186105533',
                            'permsionName': '医生管理',
                            'url': '/doctorManagement',
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
                              }
                            ]
                          },
                          {
                            'id': '8306510505186105612311',
                            'systemId': '83065105051861055123',
                            'parentId': '83065105051861055333',
                            'permsionName': '订单管理',
                            'url': '/orderManagement',
                            'menuType': 1,
                            'permsionCode': 'NJHS:/publicSystems/orderManagement',
                            'sourceBy': null,
                            'sortNo': 1,
                            'icon': 'icon-menu',
                            'description': null,
                            'isEbl': 1,
                            'isDel': 0,
                            'children': [
                              {
                                'id': '830657997754040961122222',
                                'systemId': '83065105051861055222',
                                'parentId': '8306510505186105612311',
                                'permsionName': '订单查询',
                                'url': '/inspectionOrderManagement',
                                'routeName': 'userManagement7',
                                'filePath': 'views/orderManagement/inspectionOrderManagement',
                                'menuType': 2,
                                'permsionCode': 'NJHS:/publicSystems/authorityManagement/inspectionOrderManagement',
                                'sourceBy': null,
                                'sortNo': 1,
                                'icon': 'menu',
                                'description': null,
                                'isEbl': 1,
                                'isDel': 0,
                              },
                              {
                                'id': '8306579977540409611223333',
                                'systemId': '83065105051861055333',
                                'parentId': '8306510505186105612311',
                                'permsionName': '报告管理',
                                'url': '/reportManagement',
                                'routeName': 'userManagement234',
                                'filePath': 'views/orderManagement/reportManagement',
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
                                'id': '8306579977540409611224444',
                                'systemId': '83065105051861055444',
                                'parentId': '8306510505186105612311',
                                'permsionName': '检验修改',
                                'url': '/inspectionOrderUpdateManagement',
                                'routeName': 'userManagement123',
                                'filePath': 'views/orderManagement/inspectionOrderUpdateManagement',
                                'menuType': 2,
                                'permsionCode': 'NJHS:/publicSystems/authorityManagement/userManagement',
                                'sourceBy': null,
                                'sortNo': 1,
                                'icon': 'menu',
                                'description': null,
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
