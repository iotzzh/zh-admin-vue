/*
 * @Author: zzh
 * @Date: 2022-03-01 14:54:11
 * @LastEditors: zzh
 * @LastEditTime: 2022-03-04 11:06:27
 * @Description: 病理系统路由mock
 * @FilePath: \hwason-laboratory-systems\src\layout\verticalLayout\mockData.ts
 */
const menuListData = [
    {
        'id': '001',
        'systemId': '83065105051861056',
        'parentId': '0',
        'permsionName': '权限管理',
        'url': '/pathologicalSystem/authorityManagement',
        'menuType': 1,
        'permsionCode': 'authority',
        'sortNo': 2,
        'icon': 'iconfont iconquanxian'
    },
    {
        'id': '0011',
        'systemId': '83065105051861056',
        'parentId': '001',
        'permsionName': '用户管理',
        'url': '/pathologicalSystem/authorityManagement/userManagement',
        'menuType': 2,
        'permsionCode': 'userManagement',
        'sortNo': 1,
        'icon': 'iconfont icondingdan'
    },
    {
        'id': '0012',
        'systemId': '83065105051861056',
        'parentId': '001',
        'permsionName': '角色管理',
        'url': '/pathologicalSystem/authorityManagement/roleManagement',
        'menuType': 2,
        'permsionCode': 'roleManagement',
        'sortNo': 2,
        'icon': 'iconfont icondingdan'
    },
    {
        'id': '0013',
        'systemId': '83065105051861056',
        'parentId': '001',
        'permsionName': '组织管理',
        'url': '/pathologicalSystem/authorityManagement/organizationalStructure',
        'menuType': 2,
        'permsionCode': 'organizationalStructure',
        'sortNo': 3,
        'icon': 'iconfont icondingdan'
    },
    {
        'id': '0014',
        'systemId': '83065105051861056',
        'parentId': '001',
        'permsionName': '菜单管理',
        'url': '/pathologicalSystem/authorityManagement/menuManagement',
        'menuType': 2,
        'permsionCode': 'menuManagement',
        'sortNo': 4,
        'icon': 'iconfont icondingdan'
    },
    {
        'id': '002',
        'systemId': '83065105051861056',
        'parentId': '0',
        'permsionName': '报告项目管理',
        'url': '/pathologicalSystem/reportProjectManagement',
        'menuType': 2,
        'permsionCode': 'menuManagement',
        'sortNo': 4,
        'icon': 'iconfont icondingdan'
    },
    {
        'id': '0021',
        'systemId': '83065105051861056',
        'parentId': '002',
        'permsionName': '报告项目',
        'url': '/pathologicalSystem/reportProjectManagement/reportItem',
        'menuType': 2,
        'permsionCode': 'menuManagement',
        'sortNo': 4,
        'icon': 'iconfont icondingdan'
    },
    {
        'id': '0022',
        'systemId': '83065105051861056',
        'parentId': '002',
        'permsionName': '报告项目分类',
        'url': '/pathologicalSystem/reportProjectManagement/reportItemClassification',
        'menuType': 2,
        'permsionCode': 'menuManagement',
        'sortNo': 4,
        'icon': 'iconfont icondingdan'
    },
    {
        'id': '003',
        'systemId': '83065105051861056',
        'parentId': '0',
        'permsionName': '申请项目管理',
        'url': '/pathologicalSystem/applyProjectManagement',
        'menuType': 2,
        'permsionCode': 'menuManagement',
        'sortNo': 4,
        'icon': 'iconfont icondingdan'
    },
    {
        'id': '0031',
        'systemId': '83065105051861056',
        'parentId': '003',
        'permsionName': '分单类别',
        'url': '/pathologicalSystem/applyProjectManagement/subOrdersClass',
        'menuType': 2,
        'permsionCode': 'menuManagement',
        'sortNo': 4,
        'icon': 'iconfont icondingdan'
    },
    {
        'id': '0032',
        'systemId': '83065105051861056',
        'parentId': '003',
        'permsionName': '申请项目管理',
        'url': '/pathologicalSystem/applyProjectManagement/applyProject',
        'menuType': 2,
        'permsionCode': 'menuManagement',
        'sortNo': 4,
        'icon': 'iconfont icondingdan'
    },
    {
        'id': '0033',
        'systemId': '83065105051861056',
        'parentId': '003',
        'permsionName': '分单类别对照申请项目',
        'url': '/pathologicalSystem/applyProjectManagement/subOrdersClassCompareApplyProject',
        'menuType': 2,
        'permsionCode': 'menuManagement',
        'sortNo': 4,
        'icon': 'iconfont icondingdan'
    },
    {
        'id': '0034',
        'systemId': '83065105051861056',
        'parentId': '003',
        'permsionName': '标本类型',
        'url': '/pathologicalSystem/applyProjectManagement/specimenType',
        'menuType': 2,
        'permsionCode': 'menuManagement',
        'sortNo': 4,
        'icon': 'iconfont icondingdan'
    },
    {
        'id': '0035',
        'systemId': '83065105051861056',
        'parentId': '003',
        'permsionName': '申请项目对照报告项目',
        'url': '/pathologicalSystem/applyProjectManagement/applyProjectCompareReportItems',
        'menuType': 2,
        'permsionCode': 'menuManagement',
        'sortNo': 4,
        'icon': 'iconfont icondingdan'
    },
    {
        'id': '004',
        'systemId': '83065105051861056',
        'parentId': '0',
        'permsionName': '报告单元管理',
        'url': '/pathologicalSystem/reportingUnitManagement',
        'menuType': 2,
        'permsionCode': 'menuManagement',
        'sortNo': 4,
        'icon': 'iconfont icondingdan'
    },
    {
        'id': '0041',
        'systemId': '83065105051861056',
        'parentId': '004',
        'permsionName': '报告单元',
        'url': '/pathologicalSystem/reportingUnitManagement/reportingUnit',
        'menuType': 2,
        'permsionCode': 'menuManagement',
        'sortNo': 4,
        'icon': 'iconfont icondingdan'
    },
    {
        'id': '0042',
        'systemId': '83065105051861056',
        'parentId': '004',
        'permsionName': '报告单元对照项目',
        'url': '/pathologicalSystem/reportingUnitManagement/reportingUnitCompareProject',
        'menuType': 2,
        'permsionCode': 'menuManagement',
        'sortNo': 4,
        'icon': 'iconfont icondingdan'
    },
    {
        'id': '0043',
        'systemId': '83065105051861056',
        'parentId': '004',
        'permsionName': '报告单元对照申请项目',
        'url': '/pathologicalSystem/reportingUnitManagement/reportingUnitCompareApplyProject',
        'menuType': 2,
        'permsionCode': 'menuManagement',
        'sortNo': 4,
        'icon': 'iconfont icondingdan'
    },
    {
        'id': '0044',
        'systemId': '83065105051861056',
        'parentId': '004',
        'permsionName': '报告单元组合审核条件',
        'url': '/pathologicalSystem/reportingUnitManagement/reportingUnitCombinationReviewCriteria',
        'menuType': 2,
        'permsionCode': 'menuManagement',
        'sortNo': 4,
        'icon': 'iconfont icondingdan'
    },
    {
        'id': '0045',
        'systemId': '83065105051861056',
        'parentId': '004',
        'permsionName': '报告单元选项设置',
        'url': '/pathologicalSystem/reportingUnitManagement/reportingUnitOptionSettings',
        'menuType': 2,
        'permsionCode': 'menuManagement',
        'sortNo': 4,
        'icon': 'iconfont icondingdan'
    },
    {
        'id': '0046',
        'systemId': '83065105051861056',
        'parentId': '004',
        'permsionName': '报告单元右键单维护',
        'url': '/pathologicalSystem/reportingUnitManagement/reportingUnitRightClickMaintenance',
        'menuType': 2,
        'permsionCode': 'menuManagement',
        'sortNo': 4,
        'icon': 'iconfont icondingdan'
    }
];

export {
    menuListData,
};