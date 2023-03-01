import { apiUser1, apiUser2, apiMock } from '@/api/config';

export default 
{
    getCollectionSubjectLibraryList: apiMock + '/collectionSubjectLibrary/list', // 收款主体列表
    getAllRegionList: apiMock + '/regionalDatabase/queryAllRegion', // 获取省市区列表
    getClientClassList: apiMock + '/channelClassification/query', // 获取客户类别数据列表
    getPartnerList: apiMock + '/partnerLibrary/list', // 获取合作商列表
    getClientList: apiMock + '/channelLibrary/queryChennelLibrary', // 获取客户（医院列表）
    getRoleList: apiMock + '/role/list', // 获取角色列表
    getUserCalList: apiMock + '/userCal/userCalList', // 获取用户所属机构
    getUserRoleList: apiMock + '/userRole/userHaveRoles', // 获取用户角色
};
